-- @block create supplier_table
CREATE TABLE IF NOT EXISTS supplier_table(
  supplier_id SERIAL NOT NULL PRIMARY KEY,
  supplier_table VARCHAR(50) UNIQUE NOT NULL,
  email_address TEXT NOT NULL,
  company_address TEXT NOT NULL,
  fax VARCHAR(20) NOT NULL,
  cp_no VARCHAR(12) NOT NULL,
  tel_no VARCHAR(10) NOT NULL,
  description VARCHAR(300) NOT NULL
)