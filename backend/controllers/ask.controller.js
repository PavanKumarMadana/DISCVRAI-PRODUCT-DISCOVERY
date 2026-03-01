const productService = require('../services/product.service');
const llmService = require('../services/llm.service');
const parseLLMResponse = require('../utils/parseLLMResponse');
const buildPrompt = require('../utils/promptBuilder');

exports.ask = async (req, res, next) => {
  try {
    const { query } = req.body || {};
    console.log('📨 Incoming AI search query:', query);
    
    if (!query || typeof query !== 'string') {
      console.warn('⚠️ Invalid query:', query);
      return res.status(400).json({ error: 'Missing or invalid `query` in request body' });
    }

    const products = productService.getAll();
    console.log('📦 Total products available:', products.length);
    
    const prompt = buildPrompt(query, products);
    console.log('🔨 Built prompt');
    
    const raw = await llmService.ask(prompt);
    console.log('🤖 LLM Response received');
    
    const parsed = parseLLMResponse(raw);

    // Map ids to product objects
    const matched = (parsed.productIds || [])
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);

    console.log('✅ Found', matched.length, 'matching products');
    
    return res.json({ 
      productIds: parsed.productIds || [], 
      products: matched, 
      summary: parsed.summary || '' 
    });
  } catch (err) {
    console.error('❌ Ask API Error:', err.message);
    next(err);
  }
};

