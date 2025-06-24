from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json
from langchain.prompts import PromptTemplate
from pypdf import PdfReader

# Store case data in a JSON file
CASE_FILE = "cases.json"

app=FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Initialize cases.json file if it doesn't exist
if not os.path.exists(CASE_FILE):
    with open(CASE_FILE, "w") as f:
        json.dump({}, f)


# Replace with your Google API key
os.environ["google_api_key"] = "AIzaSyBTBbpWqSE21b8sbEpwP7GLFs9GeZqX9RI" 

llm=ChatGoogleGenerativeAI(
    google_api_key=os.environ["google_api_key"],
    model="gemini-2.0-flash",
)

# Prompt templates for LangChain
summary_prompt = PromptTemplate(
    input_variables=["case_description"],
    template="Summarize the following case description in legal terms for an Indian law firm:\n{case_description}"
)

question_prompt = PromptTemplate(
    input_variables=["case_description"],
    template="Based on this case description, ask 2-3 clarifying questions to gather more details:\n{case_description}"
)


def load_cases():
    if not os.path.exists(CASE_FILE) or os.path.getsize(CASE_FILE) == 0:
        return {}
    with open(CASE_FILE, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}


def save_case(case_id, data):
    cases = load_cases()
    cases[case_id] = data
    with open(CASE_FILE, "w") as f:
        json.dump(cases, f, indent=2)

@app.get("/")
def root():
    return {"message": "Welcome to WakeelSahab Prototype"}

@app.post("/api/case/input")
def process_input(case_description: str = Form(...), file: UploadFile = File(None)):
    cases = load_cases()
    case_id = str(len(cases))
    case_data = {"description": case_description, "file_text": "", "summary": "", "questions": []}

    # Process uploaded file (PDF only)
    if file and file.filename.endswith(".pdf"):
        pdf_reader = PdfReader(file.file)
        case_data["file_text"] = "".join(page.extract_text() for page in pdf_reader.pages)

    # Combine description and file text
    full_input = case_data["description"] + "\n" + case_data["file_text"]

    # Generate summary
    summary_chain = summary_prompt | llm
    summary_result = summary_chain.invoke({"case_description": full_input})
    summary = summary_result.content

    # Generate follow-up questions
    question_chain = question_prompt | llm
    questions_result = question_chain.invoke({"case_description": full_input})
    questions = questions_result.content.split("\n")

    # Save case data
    case_data["summary"] = summary
    case_data["questions"] = questions
    save_case(case_id, case_data)

    return {
        "case_id": case_id,
        "summary": summary,
        "questions": questions,
        "editable_summary": summary
    }

@app.get("/api/case/{case_id}")
def get_case(case_id: str):
    cases = load_cases()
    return cases.get(case_id, {"error": "Case not found"})

@app.post("/api/case/{case_id}/update")
def update_summary(case_id: str, updated_summary: str = Form(...)):
    cases = load_cases()
    if case_id in cases:
        cases[case_id]["summary"] = updated_summary
        save_case(case_id, cases[case_id])
        return {"message": "Summary updated", "summary": updated_summary}
    return {"error": "Case not found"}




