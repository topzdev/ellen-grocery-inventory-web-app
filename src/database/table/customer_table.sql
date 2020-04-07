-- @block create customer table
CREATE TABLE IF NOT EXISTS customer_table(
  customer_id SERIAL PRIMARY KEY NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  home_address TEXT,
  email_address TEXT,
  cp_no VARCHAR(20),
  tel_no VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);