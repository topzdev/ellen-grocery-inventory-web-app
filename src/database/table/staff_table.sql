-- @block create staff_table
CREATE TABLE IF NOT EXISTS staff_table (
  staff_id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  middlename VARCHAR(50) NOT NULL,
  username VARCHAR(20) UNIQUE NOT NULL,
  email_adrress VARCHAR(100) NOT NULL,
  role_id INTEGER NOT NULL,
  password VARCHAR(50) NOT NULL CONSTRAINT staff_table_staff_id_fkey FOREIGN KEY (role_id) REFERENCES role_table (role_id) MATCH SIMPLE NO
  UPDATE NO ACTION ON DELETE NO ACTION,
)