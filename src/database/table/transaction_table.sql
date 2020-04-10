-- @block create transaction_table
CREATE TABLE IF NOT EXISTS transaction_table(
  transact_id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_amount FLOAT(2) NOT NULL,
  amount_paid FLOAT(2) NOT NULL,
  CONSTRAINT transaction_table_customer_id 
  FOREIGN KEY (customer_id) REFERENCES customer_table (
    customer_id) MATCH SIMPLE ON UPDATE NO ACTION 
    ON DELETE NO ACTION,
  CONSTRAINT transaction_table_account_id 
  FOREIGN KEY (account_id) REFERENCES account_table 
  (account_id) MATCH SIMPLE ON UPDATE NO ACTION 
  ON DELETE NO ACTION
)