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

## Evaluation results

```text
| Query | Keyword rank | Semantic rank |
|---|---|---|
| my redis cache keeps showing old data | 8 | 1 |
| how do I add semantic search to a table I already have | miss | 2 |
| redis or memcached for caching | 1 | 2 |
| why did my query get slower after I added an index | miss | 1 |
| what does ACID actually guarantee | 2 | 1 |
| how do I keep my postgres online while changing the schema | 6 | 3 |
| my background jobs stop after every deploy | miss | 2 |
| how do I let my database accept more writes per second | 4 | 1 |
| sql or nosql for a new product | 1 | 3 |
| why does my redis memory keep climbing | miss | 2 |
| **Summary** | **MRR 0.30 · Recall@10 0.60** | **MRR 0.67 · Recall@10 1.00** |
```

## Interpretation

Semantic search performs better overall on both metrics: its MRR is 0.67 compared with 0.30 for keyword search, and its Recall@10 is 1.00 compared with 0.60. Keyword search wins on “redis or memcached for caching,” “what does ACID actually guarantee,” “how do I keep my postgres online while changing the schema,” and “sql or nosql for a new product”; these queries contain specific technical terms that closely match titles and tags. Semantic search wins on the other six queries, which are mostly phrased as symptoms, practical problems, or natural-language descriptions rather than exact document terminology. A team may still keep keyword search because it can rank exact technical phrases and named concepts especially well, complementing semantic search's ability to understand intent.

## How the implementation works

The program finds the first relevant post ID in each system's top 10 results and converts its 1-based position into a reciprocal rank. It averages those reciprocal ranks to calculate MRR, counts queries with a relevant result to calculate Recall@10, and prints the per-query ranks plus the summary row as a Markdown table.
