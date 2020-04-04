-- @block create supplier_table
CREATE TABLE IF NOT EXISTS supplier_table(
  supplier_id SERIAL NOT NULL PRIMARY KEY,
  supplier_name VARCHAR(50) NOT NULL,
  email_address TEXT,
  company_address TEXT,
  fax VARCHAR(20),
  cp_no VARCHAR(20),
  tel_no VARCHAR(20),
  website VARCHAR(100),
  description VARCHAR(300)
)