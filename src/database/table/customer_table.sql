-- @block create customer table
CREATE TABLE IF NOT EXISTS customer_table(
  customer_id SERIAL PRIMARY KEY NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  middlename VARCHAR(50) NOT NULL,
  points INTEGER NOT NULL,
  email_address VARCHAR(100) NOT NULL,
  fax VARCHAR(20),
  cp_no VARCHAR(12),
  tel_no VARCHAR(10)
);