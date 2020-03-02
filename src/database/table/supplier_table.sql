-- @block create supplier_table
CREATE TABLE IF NOT EXISTS supplier_table(
  supplier_id SERIAL NOT NULL PRIMARY KEY,
  supplier_name VARCHAR(50) UNIQUE NOT NULL,
  email_address TEXT,
  company_address TEXT,
  fax VARCHAR(20),
  cp_no VARCHAR(12),
  tel_no VARCHAR(10),
  website VARCHAR(100),
  description VARCHAR(300)
)