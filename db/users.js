const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const {  rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password)
      VALUES($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
      `, [username, password]);
      return user;
  } catch(error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    console.log('Finding user')
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1 AND password=$2
    `, [username, password]);
    console.log('Found user')
    return ;
  } catch(error) {
    console.error('Error finding user')
    throw error;
  }
}

async function getUserById(userId) {
  try {
    console.log('Finding user')
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE userId=$1
    `, [ userId ]);

    console.log('Found user')
    return user;
  } catch(error) {
    console.error('Error finding user')
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    console.log('Finding user')
    const { rows: [ user ] } = await client.query(`
      SELECT *
      FROM users
      WHERE userName=$1 
    `, [ userName ]);

    console.log('Found user')
    return user;
  } catch(error) {
    console.error('Error finding user')
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
