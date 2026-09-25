import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

const client = new ChromaClient({ host: "my-chromadb-server-paj3.onrender.com", port: 443, ssl: true });

const embeddingFunction = new DefaultEmbeddingFunction();

async function retrieveDocuments(query) {
    try {
        const collection = await client.getCollection({
            name: "codezy_knowledge",
            embeddingFunction,
        });

        const results = await collection.query({
            queryTexts: [query],
            nResults: 2,
        });

        console.log("\nQuery:");
        console.log(query);

        console.log("\nRetrieved documents:");

        results.documents[0].forEach((document, index) => {
            console.log(`\n--- Document ${index + 1} ---`);
            console.log(document);
        });

        console.log("\nSources:");

        results.metadatas[0].forEach((metadata, index) => {
            console.log(`${index + 1}. ${metadata.source}`);
        });
    } catch (error) {
        console.error("RAG retrieval failed:", error);
    }
}

retrieveDocuments("How does Codezy execute C++ code?");