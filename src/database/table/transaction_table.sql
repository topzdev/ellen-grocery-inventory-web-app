-- @block create transaction_table
CREATE TABLE IF NOT EXISTS transaction_table(
  transact_id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  staff_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT,
  total_amount FLOAT(2) NOT NULL,
  CONSTRAINT transaction_table_customer_id FOREIGN KEY (customer_id) REFERENCES customer_table (customer_id) MATCH SIMPLE NO
  UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT transaction_table_staff_id FOREIGN KEY (staff_id) REFERENCES staff_table (staff_id) MATCH SIMPLE NO
  UPDATE NO ACTION ON DELETE NO ACTION,
)