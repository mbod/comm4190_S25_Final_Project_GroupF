// anthropic-embeddings.js - A custom embeddings class for Anthropic

const { Anthropic } = require('@anthropic-ai/sdk');
const { Embeddings } = require('langchain/embeddings/base');

/**
 * Anthropic embeddings wrapper for LangChain integration
 */
class AnthropicEmbeddings extends Embeddings {
  constructor(config) {
    super();
    this.apiKey = config.apiKey;
    // Initialize the Anthropic client correctly
    this.client = new Anthropic({
      apiKey: this.apiKey,
    });
  }

  /**
   * Get embeddings for a batch of texts
   */
  async embedDocuments(texts) {
    const embeddings = [];
    
    // Process in batches to avoid rate limits
    for (const text of texts) {
      const embedding = await this.embedQuery(text);
      embeddings.push(embedding);
      
      // Simple rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    return embeddings;
  }

  /**
   * Get embedding for a single text
   */
  async embedQuery(text) {
    try {
      // Use the appropriate embedding method based on Anthropic's API
      const response = await this.client.embeddings.create({
        model: "claude-3-haiku-20240307",
        input: text,
        dimensions: 1536
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error("Error creating embedding:", error);
      throw error;
    }
  }
}

module.exports = { AnthropicEmbeddings };
