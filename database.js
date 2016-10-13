
const DATABASE_NAME = 'magpie-bookstore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${DATABASE_NAME}`
const pgp = require('pg-promise')()
const database =  pgp(connectionString)

const addUser = (newUser ) => {
  const sql= `
    INSERT INTO
      users (email, password)
    VALUES
      ($1, $2)
    RETURNING
      *
  `
  const variables = [newUser.email, newUser.password]
  return database.one(sql,variables)
}

const authenticateUser = (email, password) => {
  const sql = `
    SELECT
     id, email, password
    FROM
      users
    WHERE
      email=$1
  `
  const variables = [email, password]
  return database.one(sql, variables)
}
module.exports = {
  addUser,
  authenticateUser
}
