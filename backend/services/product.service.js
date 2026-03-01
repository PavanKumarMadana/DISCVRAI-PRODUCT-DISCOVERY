const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'products.json');

function loadAll() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

exports.getAll = ({ category, q } = {}) => {
  const items = loadAll();
  let res = items;
  if (category) {
    res = res.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  }
  if (q) {
    const term = String(q).toLowerCase();
    res = res.filter((p) => (p.name + ' ' + p.description + ' ' + (p.tags || []).join(' ')).toLowerCase().includes(term));
  }
  return res;
};
