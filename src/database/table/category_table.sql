-- @block create category_table
CREATE TABLE IF NOT EXISTS category_table(
  category_id SERIAL NOT NULL,
  category_name VARCHAR(50) NOT NULL
)