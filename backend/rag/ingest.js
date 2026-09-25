import fs from "fs";
import path from "path";
import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new ChromaClient({ host: "my-chromadb-server-paj3.onrender.com", port: 443, ssl: true });
const embeddingFunction = new DefaultEmbeddingFunction();

async function ingestDocuments() {
    try {
        console.log("Connecting to ChromaDB and creating collection...");
        // Create the collection if it doesn't exist
        const collection = await client.getOrCreateCollection({
            name: "codezy_knowledge",
            embeddingFunction,
        });

        const docsPath = path.join(__dirname, "documents");
        const files = fs.readdirSync(docsPath).filter(f => f.endsWith(".md") || f.endsWith(".txt"));

        const documents = [];
        const metadatas = [];
        const ids = [];

        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            const filePath = path.join(docsPath, fileName);
            const content = fs.readFileSync(filePath, "utf-8");

            documents.push(content);
            metadatas.push({ source: fileName });
            ids.push(`doc_${i}`);
        }

        if (documents.length === 0) {
            console.log("No documents found to ingest.");
            return;
        }

        console.log(`Uploading ${documents.length} documents to Render...`);
        
        await collection.upsert({
            ids,
            metadatas,
            documents,
        });

        console.log("Ingestion successful! Your database is now populated.");
    } catch (error) {
        console.error("Ingestion failed:", error);
    }
}

ingestDocuments();
