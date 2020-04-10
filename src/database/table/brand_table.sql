-- @block create brand table
CREATE TABLE IF NOT EXISTS brand_table(
  brand_id SERIAL PRIMARY KEY NOT NULL,
  brand_name VARCHAR(50) UNIQUE NOT NULL
)