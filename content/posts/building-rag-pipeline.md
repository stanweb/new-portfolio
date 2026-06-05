# Building a RAG Pipeline That Actually Works

Retrieval-Augmented Generation is one of those patterns that *looks* simple on a tutorial and falls apart the moment you point it at real documents. Here is what I learned shipping one in production.

## The chunking problem

Most starter code splits documents on token count alone. In practice, this breaks headings, code blocks, and tables apart from the context that explains them. Prefer **structure-aware chunking** — split on headings first, then on size if a section is too large.

## Embedding model selection

The cheapest OpenAI embedding is rarely the right choice for domain-specific corpora. I benchmark three to five models against a hand-labeled eval set before committing to one. It takes an afternoon and saves months of "the answer is wrong" tickets.

## Evaluation is not optional

If you cannot measure retrieval quality, you cannot improve it. Build a small eval harness with ~50 question/answer pairs and run it on every prompt or model change. Precision@5 is a good starting metric.

## Conclusion

RAG is plumbing. The win is in the boring details: how you chunk, what you embed with, and how you measure.
