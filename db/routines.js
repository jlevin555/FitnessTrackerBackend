const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try{
    console.log('Adding new routine')
    const { rows: [routine] } = await client.query(`
      INSERT INTO routine(creatorId, isPublic, name, goal)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `, [creatorId, isPublic, name, goal]);

      console.log('Finished adding new routine!')
      return routine;
  } catch(error) {
    console.error('Error creating new routine')
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    console.log("Getting Activity By Id")
    const { rows: [ routine ] } = await client.query(`
      SELECT *
      FROM routines
      WHERE id=$1;
    `, [id]);
    console.log("Found Activity By Id!")
    return routine;
  } catch (error) {
    console.error("Error getting activity by Id")
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    console.log("Getting all routines")
    const { rows } = await client.query(`
    SELECT *
    FROM routines;
    `);

    console.log("Found all routines!")
    return rows;
  } catch (error) {
    console.log("Error getting routines")
    throw error;
  }
}

async function getAllRoutines() {
  try {
    console.log("Getting all routines")
    const { rows: [ activities ] } = await client.query(`
    SELECT routines.id,
    "creatorId", "isPublic",
    name, goal, users.username
    AS "creatorName"
    FROM routines LEFT
    JOIN users on routines."creatorId" = 
    users.id;
    `);
    const { rows: [ routines ] } = await client.query(`
    SELECT *
    FROM routine_activities LEFT
    JOIN activities 
    ON routine_activities."activityId" = 
    activities.id
    `);

    console.log("Found all routines!")
    return activities, routines;
  } catch (error) {
    console.error("Error getting routines")
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    console.log("Getting all public routines")
    const { rows: [ activities ] } = await client.query(`
    SELECT * 
    FROM routine_activities LEFT
    JOIN activities 
    ON routine_activities."activityId" = 
    activities.id
    `);
    const { rows: [ routines ] } = await client.query(`
    SELECT routines.id, "creatorId", "isPublic",
    name, goal, users.username AS "creatorName"
    FROM routines LEFT
    JOIN users ON routines."creatorId" = users.id 
    WHERE "isPublic" = true
    `)

    console.log("Found all public routines!")
    return activities, routines;
  } catch (error) {
    console.error("Error getting public routines")
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    console.log("Getting all routines by username")
    const { rows: [ activities ] } = await client.query(`
    SELECT *
    FROM routines
    WHERE username=$1;
    `, [username]);

    console.log("Found all routines by username!");
    return activities;
  } catch (error) {
    console.error("Error getting all routines by username")
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    console.log("Getting all public routines by username")
    const { rows: [ activities ] } = await client.query(`
    SELECT *
    FROM routines
    WHERE "isPublic" = true
    FROM username;
    `, [username]);

    console.log("Found all public routines by username!");
    return activities;
  } catch (error) {
    console.error("Error getting all public routines by username")
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    console.log("Getting all public routines by activityId")
    const { rows: [ activities ] } = await client.query(`
    SELECT *
    FROM routines
    WHERE "isPublic" IS true;
    `, [id]);

    console.log("Found all public routines by activityId!");
    return activities;
  } catch (error) {
    console.error("Error getting all public routines by activityId")
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
