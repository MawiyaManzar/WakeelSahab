# WakeelSahab – An AI-powered legal assistant for lawyers & law firms

Offering smart legal advice chat and a collaborative drafting workspace.

![image](https://github.com/user-attachments/assets/0c574d0b-2879-4f6e-a258-0ca09a8dd68b)

![image](https://github.com/user-attachments/assets/34b5faee-5260-4a91-afdb-b91d1bd8f02e)
![image](https://github.com/user-attachments/assets/144ece6f-6789-48fd-99e1-fee5c134ee00)

---

## Problem
Legal research and drafting are slow, repetitive, and error-prone. Lawyers juggle multiple sources, re-write the same clauses, and waste billable hours. Existing AI tools are generic and don’t integrate seamlessly with the drafting process.

---

## Solution
WakeelSahab combines **Legal Research + Drafting** in a single interface:

- **Chat for Law Advice**: Multi-chat interface (LLM + RAG) with voice input.
- **Legal Memo Maker**: Minimalist drafting interface like type.ai, editable with TipTap, supports AI-assisted drafting, clause suggestions, and real-time improvements.

---

## System Architecture Overview

**Frontend:** Next.js + TipTap Editor  
**Backend:** FastAPI  
**LangGraph Orchestrator:**
- Node 1: Drafter Agent (LLM)
- Node 2: Chat Agent (LLM + RAG)
- Node 3: RAG Retriever → ChromaDB Cloud

**ETL Pipeline:**  
Scrapy web scraper → text processing → populate ChromaDB Cloud

**Vector DB:** ChromaDB Cloud

---

### Excalidraw Diagram
Include a simple diagram showing:
- UI components (Chat sidebar, Editor pane, Voice icon)
- Backend pipeline (ETL → Vector DB → RAG → Agents)
- LangGraph orchestrator in the middle controlling node flow.

---

## Implementation Plan

### Phase 1: UI & Basic Backend
- Build Next.js + TipTap editor UI with type.ai-style layout.
- Create FastAPI backend endpoints for chat, draft, and retrieval.

### Phase 2: LangGraph Integration
- Define State object (stores conversation history, doc content, retrieval context).
- Create Nodes: Drafter Agent, Chat Agent, Retriever.
- Build Orchestrator with LangGraph to control flow between nodes.

---

## Deployment Plan
- **Frontend:** Vercel (Next.js)
- **Backend:** Render / Railway (FastAPI)
- **Vector DB:** ChromaDB Cloud
- **LangGraph Agents:** Deployed with backend (Docker container)

---

## Grant Usage
- Hire a legal domain expert to fine-tune prompts & evaluate accuracy.
- Pay for API usage (OpenAI, ChromaDB Cloud).
- UI/UX polish to reach type.ai-level usability.
