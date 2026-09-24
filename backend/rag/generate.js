import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const client = new ChromaClient();

const embeddingFunction = new DefaultEmbeddingFunction();

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0,
});

const prompt = PromptTemplate.fromTemplate(`
You are the Codezy AI Assistant.

Answer the user's question using only the provided Codezy context.

If the answer cannot be found in the context, say:
"I don't have enough information in the Codezy knowledge base to answer that."

Do not invent information.

Context:
{context}

Question:
{question}

Answer:
`);

async function askCodezy(question) {
    try {
        // 1. Get Chroma collection
        const collection = await client.getCollection({
            name: "codezy_knowledge",
            embeddingFunction,
        });

        // 2. Retrieve relevant documents
        const results = await collection.query({
            queryTexts: [question],
            nResults: 2,
        });

        const documents = results.documents[0];
        const metadatas = results.metadatas[0];

        // 3. Create context
        const context = documents
            .map((document, index) => {
                return `Source: ${metadatas[index].source}\n${document}`;
            })
            .join("\n\n");

        // 4. Create LangChain prompt
        const formattedPrompt = await prompt.format({
            context,
            question,
        });

        // 5. Send prompt to Groq through LangChain
        const response = await model.invoke(formattedPrompt);

        console.log("\n==============================");
        console.log("Question:");
        console.log(question);

        console.log("\nAnswer:");
        console.log(response.content);

        console.log("\nSources:");

        metadatas.forEach((metadata) => {
            console.log(`- ${metadata.source}`);
        });

        console.log("==============================\n");
    } catch (error) {
        console.error("LangChain RAG failed:", error);
    }
}

askCodezy("How does Codezy execute C++ code?");