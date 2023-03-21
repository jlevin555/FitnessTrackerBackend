const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try{
    console.log('Adding new routine')
    const { rows: [routine] } = await client.query(`
      INSERT INTO routine(creatorId, isPublic, name, goal)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `, [creatorId, isPublic, name, goal]);

      console.log('Finished adding new routine')
      return routine;
  } catch(error) {
    console.log('Error creating new routine')
    throw error;
  }
}

async function getRoutineById(id) {

}

async function getRoutinesWithoutActivities() {
  try {
    console.log("Getting all routines")
    const { rows: [ routines ] } = await client.query(`
    SELECT *
    FROM routines;
    `);

    console.log("Found all routines")
    return routines;
  } catch (error) {
    console.log("Error getting routines")
    throw error;
  }
}

async function getAllRoutines() {}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

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
