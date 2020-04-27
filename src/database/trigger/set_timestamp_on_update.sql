-- created function that trigger when there is an update on row
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- listening when there is an update on row 
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON account_table
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();