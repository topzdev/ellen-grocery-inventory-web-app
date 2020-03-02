-- @block create category_table
CREATE TABLE IF NOT EXISTS category_table(
  category_id SERIAL PRIMARY KEY NOT NULL,
  category_name VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(300)
)