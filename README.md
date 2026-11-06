# Retrieval Metrics Mini Project

Build a tiny evaluation tool that measures how good a search system is.

This project evaluates keyword search and semantic search on the same 10-query test set using **Mean Reciprocal Rank (MRR)** and **Recall@10**. No database, API keys, or external packages are required; the ranked results are supplied as fixture data.

## Files

- `eval.js`: JavaScript evaluation program.
- `test-set.csv`: the 10 queries and their relevant post IDs.
- `search-results.json`: the top-10 ranked results returned by each search system.
- `posts-dataset.csv`: the 35 posts referenced by the IDs.

## Run

```bash
node eval.js
```

## Metrics

- **Reciprocal Rank:** (1 / rank) of the first relevant result, or 0 if no relevant result appears in the top 10.
- **MRR:** the mean of reciprocal ranks across all queries.
- **Recall@10:** the fraction of queries with at least one relevant result in the top 10.

## Expected output

The completed program prints a Markdown table with the rank for each system and a summary row containing MRR and Recall@10.
