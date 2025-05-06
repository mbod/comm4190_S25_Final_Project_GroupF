// server.js - A simple RAG implementation using only Anthropic API

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Anthropic } = require('@anthropic-ai/sdk');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Make sure to set this in your environment
});

// Document storage
let documentChunks = [];
const documentPath = path.join(__dirname, 'documents', 'corpus.txt');

// Initialize document chunks
async function initializeDocument() {
  try {
    // Create documents directory if it doesn't exist
    const documentsDir = path.dirname(documentPath);
    if (!fs.existsSync(documentsDir)) {
      fs.mkdirSync(documentsDir, { recursive: true });
    }
    
    // Check if document exists
    if (!fs.existsSync(documentPath)) {
      console.log(`Document not found at ${documentPath}`);
      return;
    }
    
    // Read and process the document
    console.log(`Processing document at ${documentPath}`);
    const text = await fs.promises.readFile(documentPath, 'utf8');
    
    // Split text into chunks (simple paragraph-based chunking)
    const paragraphs = text.split(/\n\s*\n/);
    
    // Create chunks with some overlap
    documentChunks = paragraphs.map((paragraph, index) => {
      return {
        id: index,
        text: paragraph.trim(),
        source: path.basename(documentPath)
      };
    });
    
    console.log(`Processed document into ${documentChunks.length} chunks`);
  } catch (error) {
    console.error('Error processing document:', error);
  }
}

// Simple keyword search function
function findRelevantChunks(query, maxResults = 3) {
  if (documentChunks.length === 0) {
    return [];
  }
  
  // Convert query to lowercase and split into keywords
  const keywords = query.toLowerCase().split(/\s+/);
  
  // Score each chunk based on keyword matches
  const scoredChunks = documentChunks.map(chunk => {
    const text = chunk.text.toLowerCase();
    let score = 0;
    
    // Count keyword occurrences
    keywords.forEach(keyword => {
      // Skip very common words
      if (keyword.length <= 2 || ['the', 'and', 'or', 'but', 'is', 'are', 'was', 'were'].includes(keyword)) {
        return;
      }
      
      // Count matches in the text
      const regex = new RegExp(keyword, 'gi');
      const matches = (text.match(regex) || []).length;
      score += matches;
    });
    
    return { ...chunk, score };
  });
  
  // Sort by score (descending) and take top results
  const results = scoredChunks
    .filter(chunk => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
  
  // If we didn't find anything relevant, return the first few chunks as fallback
  if (results.length === 0 && documentChunks.length > 0) {
    return documentChunks.slice(0, maxResults);
  }
  
  return results;
}

// API endpoint for chat
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ success: false, message: 'No message provided' });
  }
  
  try {
    // Find relevant chunks using keyword search
    const retrievedChunks = findRelevantChunks(message);
    
    if (retrievedChunks.length === 0) {
      return res.status(500).json({ 
        success: false, 
        message: 'No document chunks available. Please check if corpus.txt exists and is properly formatted.' 
      });
    }
    
    // Format context from retrieved chunks
    const context = retrievedChunks.map(chunk => {
      return `Source: ${chunk.source}\nContent: ${chunk.text}`;
    }).join('\n\n');
    
    // Generate response using Anthropic
    const anthropicResponse = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are RestaurantBot, a concise restaurant recommendation specialist.
                        Your purpose is to recommend places to eat based on cost, vibe, and occasion.

                        ALWAYS FOLLOW THESE GUIDELINES:
                        - Provide specific restaurant recommendations from the document only
                        - Keep responses short and direct (50 words max per restaurant)
                        - For each recommendation, mention: name, why it fits their criteria, and one standout feature
                        - If multiple options exist, recommend only the top 1-2 best matches
                        - When details are missing, briefly ask for the specific information needed
                        - If no restaurants match all criteria, recommend the closest match and explain why

                        Focus on matching these key criteria:
                        1. BUDGET: $ (inexpensive), $$ (moderate), $$$ (high-end), $$$$ (luxury)
                        2. VIBE: casual, romantic, energetic, quiet, family-friendly, trendy, etc.
                        3. OCCASION: date night, family dinner, business meeting, celebration, quick bite, etc.

                        If the documents don't have a matching restaurant, say "I don't have a restaurant that matches those criteria in my database" and suggest they modify one requirement.

                        Never invent or embellish details not in the documents.
                     
                     DOCUMENTS:
                     ${context}
                     
                     QUESTION:
                     ${message}`
            }
          ]
        }
      ]
    });
    
    // Send response back to client
    res.json({
      success: true,
      message: anthropicResponse.content[0].text,
      sources: retrievedChunks.map(chunk => chunk.source)
    });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing chat request: ' + error.message 
    });
  }
});

// Start the server
app.listen(port, async () => {
  await initializeDocument();
  console.log(`RAG server running at http://localhost:3000`);
  console.log(`Your knowledge base is initialized from: ${documentPath}`);
  console.log(`Total document chunks: ${documentChunks.length}`);
});
