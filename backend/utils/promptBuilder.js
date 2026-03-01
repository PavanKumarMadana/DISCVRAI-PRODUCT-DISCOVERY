module.exports = function buildPrompt(query, products) {
  // Keep product context compact to avoid long prompts
  const brief = products.map(p => ({ id: p.id, name: p.name, category: p.category, description: p.description }));

  return `User query: "${query}"

You have the following product catalog (array of objects):
${JSON.stringify(brief, null, 2)}

Task: Return a JSON object only (no additional text) with two keys:
1) "productIds": an array of product ids from the catalog that best match the user's query (pick 0..all ids),
2) "summary": a short (1-2 sentence) explanation of why these products were chosen.

Example response:
{"productIds": ["P001", "P005"], "summary": "Budget-friendly choices with good battery life."}

Respond with valid JSON only.`;
};
