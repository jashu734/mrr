// Evaluate keyword and semantic search using MRR and Recall@10.
// Run with: node eval.js
// No third-party packages are required.
const fs = require('fs');

// Load the test queries and their relevant post IDs from the CSV fixture.
function loadTestSet(path) {
  const lines = fs.readFileSync(path, 'utf8').trim().split(/\r?\n/).slice(1);

  return lines.map(line => {
    // The query is the first CSV column; relevant IDs are semicolon-separated.
    const commaIndex = line.indexOf(',');
    const query = line.slice(0, commaIndex);
    const ids = line.slice(commaIndex + 1);

    return {
      query,
      correctIds: ids.split(';').map(Number)
    };
  });
}

const testSet = loadTestSet('test-set.csv');
const results = JSON.parse(fs.readFileSync('search-results.json', 'utf8'));

// Return the 1-based rank of the first relevant result, or null for a miss.
function rankOf(rankedIds, correctIds) {
  const index = rankedIds.slice(0, 10).findIndex(id => correctIds.includes(id));
  return index === -1 ? null : index + 1;
}

// Reciprocal rank is 1/rank; a miss contributes zero.
function reciprocalRank(rankedIds, correctIds) {
  const rank = rankOf(rankedIds, correctIds);
  return rank === null ? 0 : 1 / rank;
}

// Evaluate every query for both search systems.
let keywordRRTotal = 0;
let semanticRRTotal = 0;
let keywordHits = 0;
let semanticHits = 0;

const rows = testSet.map(({ query, correctIds }) => {
  const queryResults = results[query];

  if (!queryResults || !Array.isArray(queryResults.keyword) || !Array.isArray(queryResults.semantic)) {
    throw new Error(`Missing or invalid search results for query: "${query}"`);
  }

  const keywordRank = rankOf(queryResults.keyword, correctIds);
  const semanticRank = rankOf(queryResults.semantic, correctIds);

  keywordRRTotal += reciprocalRank(queryResults.keyword, correctIds);
  semanticRRTotal += reciprocalRank(queryResults.semantic, correctIds);

  if (keywordRank !== null) keywordHits += 1;
  if (semanticRank !== null) semanticHits += 1;

  return {
    query,
    keywordRank: keywordRank === null ? 'miss' : keywordRank,
    semanticRank: semanticRank === null ? 'miss' : semanticRank
  };
});

const queryCount = testSet.length;
if (queryCount === 0) {
  throw new Error('The test set is empty.');
}

const keywordMRR = keywordRRTotal / queryCount;
const semanticMRR = semanticRRTotal / queryCount;
const keywordRecall = keywordHits / queryCount;
const semanticRecall = semanticHits / queryCount;

// Print the Markdown comparison table.
console.log('| Query | Keyword rank | Semantic rank |');
console.log('|---|---|---|');

for (const row of rows) {
  console.log(`| ${row.query} | ${row.keywordRank} | ${row.semanticRank} |`);
}

console.log(
  `| **Summary** | **MRR ${keywordMRR.toFixed(2)} · Recall@10 ${keywordRecall.toFixed(2)}** | **MRR ${semanticMRR.toFixed(2)} · Recall@10 ${semanticRecall.toFixed(2)}** |`
);
