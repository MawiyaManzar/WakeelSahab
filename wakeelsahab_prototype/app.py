from fastapi import FastAPI, File, UploadFile, Form
from fastapi.staticfiles import StaticFiles
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json
from langchain.prompts import PromptTemplate
from pypdf import PdfReader
from pydantic import BaseModel, Field
from langchain.output_parsers import StructuredOutputParser,ResponseSchema
import requests
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

app= FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="./static"), name="static")

load_dotenv()

#set google api key
GOOGLE_API_KEY=os.getenv("google_api_key")
KANOON_API_TOKEN=os.getenv("KANOON_API_TOKEN")

#Initialize LLM
llm=ChatGoogleGenerativeAI(
    google_api_key=GOOGLE_API_KEY,
    model="gemini-2.0-flash",
)

#define schema for the output
summary_schema=[
    ResponseSchema(name="title",description="title of the case"),
    ResponseSchema(name="citation",description="citation of the case"),
    ResponseSchema(name="summary",description="summary of the case"),
    ResponseSchema(name="relevant_laws",description="relevant laws applicable to the case"),
    ResponseSchema(name="relevant_case",description="relevant cases applicable to the case")
]

summary_parser=StructuredOutputParser.from_response_schemas(summary_schema)

#define schema for final report
report_schema=[
    ResponseSchema(name="title", description="Title of the case"),
    ResponseSchema(name="citation", description="Citation of the case"),
    ResponseSchema(name="summary", description="Summary of the case"),
    ResponseSchema(name="relevant_laws", description="Relevant laws applicable to the case"),
    ResponseSchema(name="relevant_case", description="Relevant cases applicable to the case"),
    ResponseSchema(name="Winning Arguments", description="Winning arguments of the case"),
    ResponseSchema(name="Losing Arguments", description="Losing arguments of the case"),
    ResponseSchema(name="Conclusion", description="Conclusion of the case"),
    ResponseSchema(name="Recommendations", description="Recommendations for the case")
]

report_parser=StructuredOutputParser.from_response_schemas(report_schema)

summary_template = PromptTemplate(
    template="""You are a qualified senior lawyer. Understand the following {case_description} and provide a 
    summary and relevant laws applicable to it (central and state laws) in legal terms for an Indian law firm
    .\n{format_instructions}\nAPI Data: {api_data}""",
    input_variables=["case_description", "api_data"],
    partial_variables={"format_instructions": summary_parser.get_format_instructions()}
)

report_template = PromptTemplate(
    template="""You are a qualified senior lawyer with expertise in Indian law. Analyze the following case information and generate a comprehensive legal report for an Indian law firm.

Case Information: {result}

Please provide a detailed legal analysis covering:
- A clear title for the case
- Proper citation format
- Comprehensive summary of the legal matter
- Relevant Indian laws and statutes applicable
- Pertinent case precedents from Indian courts
- Strong arguments that could lead to a favorable outcome
- Potential counter-arguments and weaknesses
- Legal conclusion based on the analysis
- Specific recommendations for legal strategy

Ensure all legal terminology is accurate and appropriate for Indian legal context.
{format_instructions}""",
    input_variables=["result"],
    partial_variables={"format_instructions": report_parser.get_format_instructions()}
)

#define chain for summary

summary_chain=summary_template|llm|summary_parser

report_chain=report_template|llm|report_parser

def fetch_kanoon_data(query,api_token,pagenum=0):
    url = "https://api.indiankanoon.org/search/"
    headers = {"Authorization": f"Token {api_token}", "Accept": "application/json"}
    params = {"formInput": query, "pagenum": pagenum}
    try:
        response = requests.post(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"API request failed: {e}")

# Function to extract text from PDF
def extract_text_from_pdf(file: UploadFile):
    pdf_reader = PdfReader(file.file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() or ""
    return text

# FastAPI endpoint to generate report
@app.post("/generate-report/")
async def generate_report(
    case_description: str = Form(...),
    file: UploadFile = File(None)
):
    try:
        # Extract case description from PDF if provided
        if file and file.filename.endswith(".pdf"):
            case_description = extract_text_from_pdf(file)

        # Fetch relevant case data from Indian Kanoon API
        query = "Breach of Contract for Software Development"
        api_data = fetch_kanoon_data(query, KANOON_API_TOKEN)
        
        # Process API data to extract relevant cases
        relevant_cases = []
        if api_data.get("cases"):
            for case in api_data["cases"]:
                relevant_cases.append({
                    "title": case.get("title", "Unknown"),
                    "citation": case.get("cite", "No citation"),
                    "summary": case.get("summary", "No summary available")
                })
        api_data_str = json.dumps(relevant_cases)  # Convert to string for prompt

        # Run summary chain
        summary_inputs = {
            "case_description": case_description,
            "api_data": api_data_str
        }
        summary_result = summary_chain.invoke(summary_inputs)

        # Run report chain
        report_inputs = {"result": json.dumps(summary_result)}
        report_result = report_chain.invoke(report_inputs)

        return report_result

    except Exception as e:
        return {"error": str(e)}

# Main execution for testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)