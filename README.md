# 🤖 Codezy: AI-Powered Code Solution & Mentorship Platform

A highly scalable, AI-integrated code learning and solution platform built as an Intensive System Design & Full-Stack Architecture Project. This project serves as a comprehensive demonstration of designing production-ready backends, integrating Large Language Models (LLMs), building Retrieval-Augmented Generation (RAG) pipelines, managing complex frontend editor states, and implementing **event-driven background architectures**.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client["🖥️ Client — React 19 + Vite + Zustand"]
        A1[Home / Dashboard]
        A2[Monaco Code Editor]
        A3[AI Mentorship Chat]
        A4[Contest Community Groups]
    end

    subgraph Backend["🟢 Node.js / Express API — Port 5000"]
        B1["/api/user — Auth & JWT"]
        B2["/api/solution — CRUD Code"]
        B3["/api/ai — RAG Orchestration"]
        B4["/api/contest — Group & Websockets"]
    end

    subgraph BackgroundWorker["⚙️ Cron / Worker Threads"]
        W1["Contest Fetcher (Polling external APIs)"]
        W2["Group Auto-Generator"]
    end

    subgraph DataLayer["🍃 MongoDB Atlas"]
        C1[(Users & Solutions)]
        C2[(Contests & Groups)]
    end

    subgraph RAGEngine["🟠 RAG & Vector Engine"]
        D1["ChromaDB Vector Store"]
        D2["LangChain Core"]
    end

    Client -->|REST & WebSockets| Backend
    Backend -->|Mongoose ODM| DataLayer
    Backend -->|Query| RAGEngine
    BackgroundWorker -->|Polls| ExternalAPIs["Kontests / Codeforces API"]
    BackgroundWorker -->|Creates Data| DataLayer
    BackgroundWorker -->|Triggers| Backend
```

---

## 🔄 End-to-End Workflows

### Contest Notification & Group Auto-Generation Pipeline 🆕

To foster a community of competitive programmers, Codezy utilizes a background event-driven architecture to track coding contests and automatically spin up discussion groups.

```mermaid
flowchart LR
    subgraph BackgroundWorker["Scheduled Cron Worker"]
        W1["Poll 3rd Party APIs\n(LeetCode, Codeforces)"] --> W2{New Contest Found?}
        W2 -- Yes --> W3["Upsert to MongoDB\nCreate Contest Record"]
    end

    subgraph BackendEvent["Event Driven Logic"]
        W3 --> B1["Auto-Generate Group\nName = Contest Name"]
        B1 --> B2["Emit WebSocket Event"]
    end

    subgraph ClientLayer["Frontend Real-Time Updates"]
        B2 --> C1["Push Notification:\n'Upcoming Contest!'"]
        C1 --> C2["Users Join Group"]
        C2 --> C3["Post Solutions & Discuss"]
    end
    
    subgraph PostContest["Lifecycle Management"]
        C3 --> P1{Contest Over?}
        P1 -- Yes --> P2["Archive Group\n(Read-only / Past Solutions)"]
    end
```

---

### AI Mentorship — RAG Query Pipeline

```mermaid
flowchart LR
    A["User Chat Message"] --> B["Embed Query\n(LangChain)"]
    B --> C["ChromaDB\nSemantic Similarity Search"]
    C --> D{Similarity Score High?}
    D -- No --> E["General LLM\nResponse"]
    D -- Yes --> F["Top Relevant\nCode Solutions"]
    F --> G["Inject Context\ninto System Prompt"]
    G --> H["Groq / Gemini LLM"]
```

---

### Code Solution — Ingestion Pipeline

```mermaid
flowchart LR
    subgraph ClientValidation["Client-Side Validation"]
        V1["Code Editor Input"] --> V2{Valid Length?}
        V2 -- Yes --> V4["POST /api/solution"]
    end

    subgraph Ingestion["Backend Ingest & Vectorize"]
        A["Raw Code String"] --> B["LangChain TextSplitter"]
        B --> C["Store in ChromaDB\n(Vector Space)"]
        A --> E["Save to MongoDB\n(Document Store)"]
    end

    V4 --> Ingestion
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    USERS {
        ObjectId _id PK
        string username
    }
    SOLUTIONS {
        ObjectId _id PK
        ObjectId user_id FK
        string code_content
    }
    CONTESTS {
        ObjectId _id PK
        string platform
        string contest_name
        date start_time
        date end_time
    }
    CONTEST_GROUPS {
        ObjectId _id PK
        ObjectId contest_id FK
        array participants "[User IDs]"
        array solution_links "[Solution IDs]"
        string status "ACTIVE or ARCHIVED"
    }
    
    USERS ||--o{ CONTEST_GROUPS : "joins"
    CONTESTS ||--o| CONTEST_GROUPS : "generates"
    CONTEST_GROUPS ||--o{ SOLUTIONS : "contains"
```

---

## 📂 Project Structure

```text
Codezy/
├── frontend/                        # React + Vite Client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/                   # Route pages (Home, Editor, Chat, Contests)
│   │   ├── store/                   # Zustand global state (editor, user)
│   │   └── App.jsx                  
│   └── package.json
│
├── backend/                         # Node.js + Express Server
│   ├── ai/                          # LLM Providers and Prompt templates
│   ├── controllers/                 
│   ├── middlewares/                 
│   ├── models/                      # User, Solution, Contest, ContestGroup
│   ├── rag/                         # LangChain workflows & ChromaDB setup
│   ├── routes/                      
│   ├── workers/                     # Cron jobs for external APIs
│   ├── sockets/                     # WebSocket implementation
│   ├── index.js                     
│   └── package.json
│
└── README.md                        
```

---

## 📝 Interview Concept Cheatsheet

- **How do you track and update contests?** "I implemented an event-driven background worker using Node-Cron that polls APIs like Kontests. It upserts the data into MongoDB, completely decoupled from the main thread so user API requests aren't slowed down."
- **How are users notified of contests?** "Instead of the client polling the server, which is inefficient, I used WebSockets (Socket.io). When the worker saves a new contest, the backend emits a real-time event to all connected clients."
- **What happens to the group when the contest ends?** "The automated worker triggers a state change in the database when `current_time > contest.end_time`. The group status flips to ARCHIVED, turning it into a permanent historical record where users can still view the posted solutions for that specific contest."
- **Why RAG?** "Instead of fine-tuning a model (which is static), we perform a semantic search in ChromaDB to find relevant past solutions, then append that context to the prompt before asking the LLM."
