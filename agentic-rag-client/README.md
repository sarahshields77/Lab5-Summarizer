# COMP308 - Assignment #5: Emerging Technologies, Sustainability, and Responsibility

## Project Overview

This project fulfills the requirements for Assignment #5 by examining the initiatives of leading software companies concerning sustainability and utilizing Generative AI (Google's Gemini API) to summarize pertinent articles on related topics.

The application allows a user to input the text of an article into a designated file (`./data/info.txt`). It then uses a Node.js backend to send this text to the Google Gemini API via LangChain, requesting a summary. The generated summary is displayed using a simple React frontend.

This project was adapted from the "Agentic RAG Application" provided in the Lab Session for Week 13[cite: 1, 2]. The original RAG and agentic functionalities were modified or removed to focus specifically on the article summarization task required for this assignment.

## Group Members

* Chris Busse
* Abdoullahi Isse
* Neha Patel
* Sarah Shields
* Samantha Shirley

## Technologies Used

* **Backend:** Node.js, Express.js
* **Frontend:** React (with Vite)
* **AI Interaction:** LangChain JS (`@langchain/google-genai`), Google Gemini API (`gemini-1.5-pro-002` model)
* **Other Libraries:** `axios`, `cors`, `dotenv`, `body-parser`, `nodemon`

## Setup Instructions

1.  **Prerequisites:** Ensure you have Node.js and npm installed.
2.  **Project Files:** Obtain the project files (including the `AGENTIC-RAG` backend folder and the `agentic-rag-client` frontend folder).
3.  **Backend Dependencies:**
    * Navigate to the backend root directory (`AGENTIC-RAG`) in your terminal.
    * Run `npm install` to install the required dependencies listed in `package.json`[cite: 9].
4.  **Frontend Dependencies:**
    * Navigate to the frontend directory (`agentic-rag-client`) in your terminal.
    * Run `npm install` to install the required dependencies (including React, Vite, and `axios`).
5.  **API Key:**
    * In the backend root directory (`AGENTIC-RAG`), create a file named `.env`.
    * Inside the `.env` file, add the following line, replacing `your-actual-gemini-api-key-here` with your actual Google Gemini API key[cite: 32]:
        ```
        GOOGLE_API_KEY=your-actual-gemini-api-key-here
        ```
    * **Important:** Ensure this key is kept confidential and the `.env` file is added to your `.gitignore` if using version control.

## Running the Summarizer

1.  **Prepare Article:**
    * Choose the article you wish to summarize.
    * Copy its full text.
    * Paste the text into the `./AGENTIC-RAG/data/info.txt` file, replacing any existing content[cite: 28]. Save the file.
2.  **Start Backend Server:**
    * Open a terminal in the backend root directory (`AGENTIC-RAG`).
    * Run the command: `npm run dev`[cite: 9, 33].
    * The terminal should indicate `Server running at http://localhost:5000`[cite: 27].
3.  **Start Frontend Client:**
    * Open a *separate* terminal in the frontend directory (`agentic-rag-client`).
    * Run the command: `npm run dev`[cite: 50].
    * Vite will provide a local URL (usually `http://localhost:5173`). Open this URL in your web browser[cite: 50].
4.  **Generate Summary:**
    * In the browser window showing the React app, you can optionally type a description of the article topic in the input box (e.g., "Environmental Impact Article") for tracking purposes.
    * Click the "Send" button.
    * The frontend will contact the backend, which will process the article from `info.txt` using the Gemini API and send the generated summary back to be displayed in the chat window.
5.  **Summarizing Another Article:** To summarize the second article required for the assignment, repeat step 1 (update `info.txt`), ensure the backend/frontend servers are running, and repeat step 4.

## Implementation Details

The core logic resides in the backend's `agenticRag.js` file.

1.  An Express server listens for POST requests on the `/api/query` endpoint[cite: 20].
2.  When a request is received, the server uses the `TextLoader` from LangChain to load the article content from `./data/info.txt`. [change 'info' to actual file name]
3.  A specific summarization prompt is constructed, embedding the full article text.
4.  The prompt is sent to the configured Google Gemini model (`gemini-1.5-pro-002`) via the `ChatGoogleGenerativeAI` instance from `@langchain/google-genai`.
5.  The AI's response (the summary) is extracted and sent back to the frontend as a JSON object [cite: self-generated based on user interaction].
6.  The React frontend (`App.jsx`) uses `axios` to send the request and then displays the received summary in the chat interface.

(Removed original RAG data retrieval and agentic follow-up logic from the Week 13 Lab base).

## Article Selection

* **Summary 1 (Impact of Emerging Technologies):**
    * (https://www.unep.org/news-and-stories/story/ai-has-environmental-problem-heres-what-world-can-do-about)
    * (https://www.greenmatch.co.uk/blog/technology-environmental-impact)
    * 
* **Summary 2 (Sustainable Solutions by Software Makers):**
    * (https://www.microsoft.com/en-us/corporate-responsibility/sustainability)
    * (https://sustainability.aboutamazon.com/products-services/aws-cloud)
    * (https://sustainability.google/)

## Testing

* Verified backend started without errors.
* Verified frontend loaded correctly.
* Tested summarization with Article 1, checked output quality.
* Tested summarization with Article 2, checked output quality.
* Checked error handling (e.g., what happens if the API key is wrong).
* Ensured summaries were displayed correctly on the frontend.
