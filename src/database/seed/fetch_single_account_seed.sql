SELECT
  account_id,
  firstname,
  lastname,
  middlename,
  username,
  email_address,
  role_id
FROM account_table
WHERE
  account_id = 1
FETCH FIRST
  1 ROW ONLY