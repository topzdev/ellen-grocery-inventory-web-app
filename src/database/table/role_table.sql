-- @block create role_table
CREATE TABLE IF NOT EXISTS role_table (
role_id SERIAL PRIMARY KEY,
role_name VARCHAR(20) NOT NULL
)