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

load_dotenv()

os.environ["google_api_key"] = "AIzaSyBTBbpWqSE21b8sbEpwP7GLFs9GeZqX9RI" 

llm=ChatGoogleGenerativeAI(
    google_api_key=os.environ["google_api_key"],
    model="gemini-2.0-flash",
)
schema=[
    ResponseSchema(name="title",description="title of the case"),
    ResponseSchema(name="citation",description="citation of the case"),
    ResponseSchema(name="summary",description="summary of the case"),
    ResponseSchema(name="relevant_case",description="relevant cases applicable to the case"),
    ResponseSchema(name="relevant_laws",description="relevant laws applicable to the case")
]
summary_parser=StructuredOutputParser.from_response_schemas(schema)

#two things understand the problem & relevant laws according to the case 
summary_template=PromptTemplate(template="You are a Qualified senior lawyer.Understand the following {case_description} and provide a summary and relevant laws applicable to it (central laws and state laws) of the case in legal terms for an Indian law firm.\n{format_instructions}\nAPI Data: {api_data}",
                                input_variables=["case_description","api_data"],
                                partial_variables={"format_instructions":summary_parser.get_format_instructions()})

# query|summary_template|llm|o/p parser |fetch_kanoon_data|kanoon_data_parser|llm|o/p parser

# class LegalCase(BaseModel):
#     title: str = Field(description="Title of the legal case")
#     citation: str = Field(description="Citation of the case")
#     summary: str = Field(description="Brief summary of the case")
#     relevant_laws: str = Field(description="Relevant laws applicable to the case")

# summary_parser=StructuredOutputParser(pydantic_object=LegalCase)
os.environ["KANOON_API_TOKEN"] = "14643c2a5b137ab178234409a2e8b8e219629d60" 

def fetch_kanoon_data(query, api_token, pagenum=0):
    url = "https://api.indiankanoon.org/search/"
    headers = {
        "Authorization": f"Token {api_token}",
        "Accept": "application/json"
    }
    params = {
        "formInput": query,
        "pagenum": pagenum  # Page number starts from 0
    }
    response = requests.post(url, headers=headers, params=params)
    
    if response.status_code == 200:
        try:
            return response.json()
        except Exception as e:
            raise Exception(f"JSON decode error: {e}")
    elif response.status_code == 403:
        raise Exception("Invalid API token or verification failed")
    else:
        raise Exception(f"API request failed: {response.status_code} - {response.text}")


summary_chain=summary_template|llm|summary_parser

api_token = os.getenv("KANOON_API_TOKEN")  # Store token in .env
query = "Breach of Contract for Software Development"

api_data = fetch_kanoon_data(query, api_token)
# print("api_data:", api_data)
# print("Type of api_data:", type(api_data))

inputs = {
    "case_description": "A company contracts with a software developer to create a customized management system within six months. The developer fails to deliver the working software by the deadline without a valid reason and stops responding to calls. Company sues the developer",
    "api_data": api_data.values()
}

result = summary_chain.invoke(inputs)
print(result)
# query = result.content.title
# api_data = fetch_kanoon_data(query, api_token)