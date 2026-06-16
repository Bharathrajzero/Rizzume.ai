-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create HNSW index for fast vector similarity search
CREATE INDEX resume_chunks_embedding_idx ON resume_chunks 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Function for cosine similarity search
CREATE OR REPLACE FUNCTION match_resume_chunks(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id text,
  resume_id text,
  content text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT 
    id,
    resume_id,
    content,
    1 - (embedding <=> query_embedding) as similarity
  FROM resume_chunks
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
