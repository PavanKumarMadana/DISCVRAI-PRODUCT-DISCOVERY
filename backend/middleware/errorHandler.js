exports.errorHandler = (err, req, res, next) => {
  console.error(err && err.message ? err.message : err);
  if (err && /OPENAI_API_KEY|Missing OPENAI_API_KEY/.test(err.message || '')) {
    return res.status(502).json({ error: 'LLM service unavailable (missing API key)' });
  }
  res.status(500).json({ error: 'Internal server error' });
};
