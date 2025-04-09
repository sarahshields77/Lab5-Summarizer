import dotenv from "dotenv";
dotenv.config();

// Import the required libraries
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import natural from "natural";
import { TextLoader } from "langchain/document_loaders/fs/text";

// Initialize Express server
const app = express();
const port = 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Create a new instance of the ChatGoogleGenerativeAI model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro-002",
  maxOutputTokens: 2048,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
});

// Function to load documents
async function loadDocuments() {
  const loader = new TextLoader("./data/SustainableSolutions.txt");
  try {
    const docs = await loader.load();
    console.log("Loaded documents successfully.");
    return docs;
  } catch (error) {
    console.error("Error loading documents:", error);
    return [];
  }
}

// Define API endpoint for query handling
app.post("/api/query", async (req, res) => {
  const { query } = req.body;

  try {
    // Load documents
    const documents = await loadDocuments();
    if (!documents.length || !documents[0].pageContent) { 
      return res
        .status(500)
        .json({ error: "Failed to load document text or document is empty." });
  }

    // Get the full text from the loaded document
    const articleText = documents[0].pageContent;

    // Define the summarization prompt
    const summarizationPrompt = `Please provide a comprehensive, multi-paragraph summary of the following article:\n\n${articleText}`; 

    console.log("Sending article to Gemini for summarization...");
    const summaryResponse = await model.invoke([["human", summarizationPrompt]]);
    console.log("Summary Received:", summaryResponse.content);

    
    // Send the response
    res.json({
      summary: summaryResponse.content
    });
  } catch (error) {
    console.error("Error during summarization process:", error);
    res.status(500).json({ error: "An error occurred while generating the summary." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
