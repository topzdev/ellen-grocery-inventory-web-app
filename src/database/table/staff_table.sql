-- @block create staff_table
CREATE TABLE IF NOT EXISTS staff_table (
  staff_id SERIAL PRIMARY KEY,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  middlename VARCHAR(50),
  username VARCHAR(20) UNIQUE,
  email_adrress VARCHAR(100),
  role_id INTEGER,
  password VARCHAR(50),
  CONSTRAINT staff_table_staff_id_fkey FOREIGN KEY (role_id) REFERENCES role_table (role_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
)