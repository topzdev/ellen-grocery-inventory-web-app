-- @block create account_table
CREATE TABLE IF NOT EXISTS account_table (
  account_id SERIAL,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  middlename VARCHAR(50),
  username VARCHAR(20),
  email_address VARCHAR(100),
  role_id INTEGER,
  password TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(role_id, username, email_address),
  CONSTRAINT account_table_account_id_fkey FOREIGN KEY (role_id) REFERENCES role_table (role_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
)