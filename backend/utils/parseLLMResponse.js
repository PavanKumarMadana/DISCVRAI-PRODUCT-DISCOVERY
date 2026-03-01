module.exports = function parseLLMResponse(text) {
  if (!text) return { productIds: [], summary: '' };

  // Try to locate a JSON object in the text
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  let jsonText = text;
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    jsonText = text.slice(firstBrace, lastBrace + 1);
  }

  try {
    const obj = JSON.parse(jsonText);
    return { productIds: Array.isArray(obj.productIds) ? obj.productIds : [], summary: obj.summary || '' };
  } catch (err) {
    // As a fallback, try to find ids like P001 in the text
    const ids = Array.from(new Set((text.match(/P\d{3}/g) || [])));
    // Fallback summary is the raw text truncated
    const summary = text.replace(/\n/g, ' ').trim().slice(0, 300);
    return { productIds: ids, summary };
  }
};
