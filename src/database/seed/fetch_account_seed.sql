SELECT
  account.account_id,
  account.firstname || ' ' || account.lastname AS fullname,
  account.username,
  role.role_name
FROM account_table account
INNER JOIN role_table role ON role.role_id = account.role_id