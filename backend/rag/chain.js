
import { ChatGroq } from "@langchain/groq";
import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import dotenv from "dotenv";

dotenv.config();

const client = new ChromaClient({ host: "my-chromadb-server-paj3.onrender.com", port: 443, ssl: true });

const embeddingFunction = new DefaultEmbeddingFunction();

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0,
});

const MAX_DISTANCE = 0.7;

async function askCodezy(question) {
    try {
        // Get Chroma collection
        const collection = await client.getCollection({
            name: "codezy_knowledge",
            embeddingFunction,
        });

        // Retrieve candidates
        const results = await collection.query({
            queryTexts: [question],
            nResults: 8,
        });

        console.log("\nQuestion:");
        console.log(question);

        // Combine documents + metadata + distances
        const candidates = results.documents[0].map((document, index) => ({
            document,
            metadata: results.metadatas[0][index],
            distance: results.distances[0][index],
        }));

        console.log("\nRetrieved candidates:");

        candidates.forEach((item, index) => {
            console.log(
                `${index + 1}. ${item.metadata?.source} | Distance: ${item.distance}`
            );
        });

        // Filter by relevance
        const relevantDocuments = candidates.filter(
            item => item.distance <= MAX_DISTANCE
        );



                const uniqueDocuments = relevantDocuments.filter(
    (item, index, array) =>
        index === array.findIndex(
            other => other.document === item.document
        )
        );

        console.log("\nRelevant documents:");
        
        uniqueDocuments.forEach((item, index) => {
            console.log(
                `${index + 1}. ${item.metadata?.source} | Distance: ${item.distance}`
            );
        });


        
        console.log(
            `\nRetrieved: ${candidates.length} | Relevant: ${relevantDocuments.length}`
        );

        // No relevant information found
        if (uniqueDocuments.length === 0) {
            console.log(
                "\nNo sufficiently relevant documents found."
            );

            return;
        }

        // Build context ONLY from relevant documents
        const context = uniqueDocuments
            .map(item => item.document)
            .join("\n\n");

        // Send filtered context to Groq
const stream = await model.stream([
    {
        role: "system",
        content: `
You are the Codezy AI Assistant.

Answer the user's question using only the provided Codezy context.

If the answer cannot be found in the context, say:

"I don't have enough information in the Codezy knowledge base to answer that."

Do not invent information.

Context:

${context}
        `,
    },
    {
        role: "user",
        content: question,
    },
]);

console.log("\nAnswer:");

for await (const chunk of stream) {
    process.stdout.write(chunk.content || "");
}

console.log("\n");

        console.log("\nAnswer:");
        console.log(stream.content);

        console.log("\nSources:");

console.log("\nRelevant documents:");

relevantDocuments.forEach((item, index) => {
    console.log(`\n--- Relevant Document ${index + 1} ---`);
    console.log("Source:", item.metadata?.source);
    console.log("Distance:", item.distance);
    console.log("Content:");
    console.log(item.document);
});

    } catch (error) {
        console.error("LangChain RAG failed:", error);
    }
}

askCodezy("How does Codezy execute C++ code?");

