-- @block create promo_table
CREATE TABLE IF NOT EXISTS promo_table(
  promo_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  promo_start TIMESTAMP WITH TIME ZONE,
  promo_end TIMESTAMP WITH TIME ZONE,
  promo_off FLOAT(2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT,
  CONSTRAINT promo_table_product_id_hkey (product_id) FOREIGN KEY product_table (product_id) MATCH SIMPLE NO
  UPDATE NO ACTION ON DELETE NO ACTION
)