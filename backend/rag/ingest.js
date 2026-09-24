
import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

const client = new ChromaClient();
const embeddingFunction = new DefaultEmbeddingFunction();

const MAX_DISTANCE = 0.7;

async function retrieveDocuments(query) {
    try {
        const collection = await client.getCollection({
            name: "codezy_knowledge",
            embeddingFunction,
        });

        // Step 1: Retrieve more candidates
        const results = await collection.query({
            queryTexts: [query],
            nResults: 8,
        });

        // Step 2: Combine documents, metadata and distances
        const candidates = results.documents[0].map((document, index) => ({
            document,
            metadata: results.metadatas[0][index],
            distance: results.distances[0][index],
        }));

        // Step 3: Keep only relevant documents
        const relevantDocuments = candidates.filter(
            item => item.distance <= MAX_DISTANCE
        );

        console.log("\nQuery:");
        console.log(query);

        console.log("\nAll candidates:");

        candidates.forEach((item, index) => {
            console.log(
                `${index + 1}. ${item.metadata?.source} | Distance: ${item.distance}`
            );
        });

        console.log("\nRelevant documents:");

        relevantDocuments.forEach((item, index) => {
            console.log(`\n--- Relevant Document ${index + 1} ---`);
            console.log("Distance:", item.distance);
            console.log("Source:", item.metadata?.source);
            console.log(item.document);
        });

        console.log(
            `\nRetrieved: ${candidates.length} | Relevant: ${relevantDocuments.length}`
        );

        return relevantDocuments;

    } catch (error) {
        console.error("RAG retrieval failed:", error);
        return [];
    }
}

retrieveDocuments("How does Codezy execute C++ code?");

