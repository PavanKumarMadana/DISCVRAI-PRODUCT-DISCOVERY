const axios = require('axios');

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

if (!OPENAI_KEY) {
  console.warn('⚠️  OPENAI_API_KEY not set — /api/ask will use mock responses for testing');
}

// Mock response for testing without API key
const getMockResponse = (prompt) => {
  console.log('📝 Using MOCK response for testing');
  return JSON.stringify({
    productIds: ['P001', 'P006', 'P003'],
    summary: 'Based on your query, I recommend our best selling laptops and portable tech. These products offer excellent value for work and entertainment.'
  });
};

exports.ask = async (prompt) => {
  // Use mock response if no API key
  if (!OPENAI_KEY || OPENAI_KEY.includes('placeholder')) {
    return getMockResponse(prompt);
  }

  try {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that responds in strict JSON when asked to pick product ids.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.0
    };

    const res = await axios.post(OPENAI_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      timeout: 20000
    });

    const text = res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message && res.data.choices[0].message.content;
    return text || '';
  } catch (err) {
    console.error('LLM API Error:', err.message);
    throw err;
  }
};

