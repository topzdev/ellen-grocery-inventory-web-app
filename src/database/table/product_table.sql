-- @block create product table product_table
CREATE TABLE IF NOT EXISTS product_table(
  product_id SERIAL NOT NULL,
  product_name VARCHAR(50) UNIQUE NOT NULL,
  barcode VARCHAR(50) NOT NULL,
  description VARCHAR(300) NOT NULL,
  quantity INTEGER NOT NULL,
  quantity_min INTEGER NOT NULL,
  quantity_max INTEGER NOT NULL,
  price FLOAT(2),
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(product_id, barcode),
  category_id INTEGER,
  brand_id INTEGER,
  supplier_id INTEGER,
  CONSTRAINT product_table_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES brand_table (brand_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT product_table_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES supplier_table (supplier_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
)