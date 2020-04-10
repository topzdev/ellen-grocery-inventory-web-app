-- @block create supplier_table
CREATE TABLE IF NOT EXISTS supplier_table(
  supplier_id SERIAL NOT NULL PRIMARY KEY,
  supplier_name TEXT NOT NULL,
  email_address TEXT,
  company_address TEXT,
  fax TEXT,
  cp_no TEXT,
  tel_no TEXT,
  website TEXT,
  description TEXT
)