// eval.js starter. Fill in the four TODOs, then run: node eval.js
// You should not need any libraries. Plain Node.js is enough.
const fs = require('fs');

// --- 1. Load the inputs (already done for you) -----------------------------
function loadTestSet(path) {
  const lines = fs.readFileSync(path, 'utf8').trim().split('\n').slice(1);
  return lines.map(line => {
    const [query, ids] = line.split(',');
    return { query, correctIds: ids.split(';').map(Number) };
  });
}
const testSet = loadTestSet('test-set.csv');
const results = JSON.parse(fs.readFileSync('search-results.json', 'utf8'));

// --- 2. TODO: Reciprocal Rank ----------------------------------------------
function reciprocalRank(rankedIds, correctIds) {
  // TODO: implement
}

// Helper: the 1-based rank of the first correct id, or null if it is a miss.
function rankOf(rankedIds, correctIds) {
  // TODO: implement
}

// --- 3. TODO: run the evaluation loop --------------------------------------

// --- 4. TODO: print a markdown comparison table ----------------------------
