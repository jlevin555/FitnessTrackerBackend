const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    console.log("Adding new activity")
    const { rows: [activities] } = await client.query (`
    INSERT INTO activities(name, description) 
    VALUES($1, $2) 
    RETURNING *;
    `, [name, description]);
  
    console.log("Finished adding new activity!")
    return activities;
    } catch (error) {
      console.error("Error creating new activity")
      throw error;
    }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    console.log("Getting all activities")
    const { rows: [ activities ] } = await client.query(`
    SELECT *
    FROM activities;
    `);
    console.log("Found all activities!")
    return [activities];
  } catch (error) {
    console.error("Error getting activities")
    throw error;
  }
}

async function getActivityById(id) {
  try {
    console.log("Getting Activity By Id")
    const { rows: [ activities ] } = await client.query(`
      SELECT *
      FROM activities
      WHERE id=$1;
    `, [id]);
    console.log("Found Activity By Id!")
    return activities;
  } catch (error) {
    console.error("Error getting activity by id")
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    console.log("Getting Activity By Name")
    const { rows: [ activities ] } = await client.query(`
      SELECT *
      FROM activities
      WHERE name=$1;
    `, [name]);
    console.log("Found Activity By Name!")
    return activities;
  } catch (error) {
    console.error("Error getting activity by name")
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  try {
    console.log("Attaching Activities to Routines")
    const { rows: [ activities ] } = await client.query(`
      SELECT * 
      FROM activities
      WHERE routines=$1;
    `, [routines]);
    console.log("Attached Activities to Routine!")
    return activities;
  } catch (error) {
    console.error("Error attaching activities to routine")
    throw error;
  }
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
