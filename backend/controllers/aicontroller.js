import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const client = new ChromaClient();

const embeddingFunction = new DefaultEmbeddingFunction();

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0,
});

const prompt = PromptTemplate.fromTemplate(`
You are the Codezy AI Assistant.

Answer the user's question clearly, accurately, and helpfully.

You have access to two sources of information:

1. Codezy Knowledge Base
2. Your general knowledge

Use the Codezy knowledge base when relevant.

If the Codezy context contains information relevant to the
question, prioritize that information.

If the Codezy context does NOT contain relevant information,
you may answer using your general knowledge.

Do NOT claim that information came from the Codezy knowledge
base unless it actually appears in the provided context.

Use the conversation history to understand references such as
"it", "that", "this", "what about Python", etc.

Do not invent information presented as Codezy-specific facts.

Conversation History:

{history}

Codezy Context:

{context}

Current Question:

{question}

Answer:
`);

export const askAI = async (req, res) => {
    try {
        const { question, history = [] } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                message: "Question is required",
            });
        }

        // Get Chroma collection
        const collection = await client.getCollection({
            name: "codezy_knowledge",
            embeddingFunction,
        });

        // Retrieve relevant chunks
// --------------------------------
// RETRIEVE RELEVANT CHUNKS
// --------------------------------

const results = await collection.query({
    queryTexts: [question],
    nResults: 3,
});

const documents = results.documents[0] || [];
const metadatas = results.metadatas[0] || [];
const distances = results.distances?.[0] || [];

// --------------------------------
// FILTER IRRELEVANT RESULTS
// --------------------------------

// Chroma distance:
// lower = more similar
//
// Only keep results whose distance
// is below our relevance threshold.

const DISTANCE_THRESHOLD = 0.8;

const relevantResults = documents
    .map((document, index) => ({
        document,
        metadata: metadatas[index],
        distance: distances[index],
    }))
    .filter(
        (result) =>
            result.distance !== undefined &&
            result.distance <= DISTANCE_THRESHOLD
    );

// --------------------------------
// CREATE CONTEXT
// --------------------------------

const context = relevantResults
    .map((result) => {
        return `Source: ${
            result.metadata?.source || "unknown"
        }\n${result.document}`;
    })
    .join("\n\n");

        // Create conversation history
        const conversation = history
            .slice(-6)
            .map((message) => {
                return `${message.role}: ${message.content}`;
            })
            .join("\n");

        // Create LangChain prompt
        const formattedPrompt = await prompt.format({
            history: conversation,
            context,
            question,
        });

        // Remove duplicate sources
const sources = [
    ...new Set(
        relevantResults
            .map(
                (result) =>
                    result.metadata?.source
            )
            .filter(Boolean)
    ),
];

        // --------------------------------
        // STREAM RESPONSE
        // --------------------------------

        const stream = await model.stream(formattedPrompt);

        res.setHeader(
            "Content-Type",
            "application/x-ndjson; charset=utf-8"
        );

        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Transfer-Encoding", "chunked");

        // Stream AI chunks
        for await (const chunk of stream) {
            const content = chunk.content || "";

            if (content) {
                res.write(
                    JSON.stringify({
                        type: "chunk",
                        content,
                    }) + "\n"
                );
            }
        }

        // Send sources after answer is complete
        res.write(
            JSON.stringify({
                type: "sources",
                sources,
            }) + "\n"
        );

        // Tell frontend streaming is finished
        res.write(
            JSON.stringify({
                type: "done",
            }) + "\n"
        );

        res.end();

    } catch (error) {
        console.error("AI controller error:", error);

        if (!res.headersSent) {
            return res.status(500).json({
                message: "Failed to generate AI response",
            });
        }

        res.end();
    }
};