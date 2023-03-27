const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    console.log("Adding new activity")
    const { rows: [activity] } = await client.query (`
    INSERT INTO activities(name, description) 
    VALUES($1, $2) 
    RETURNING *;
    `, [name, description]);
  
    console.log("Finished adding new activity!")
    return activity;
    } catch (error) {
      console.error("Error creating new activity")
      throw error;
    }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    console.log("Getting all activities")
    const { rows } = await client.query(`
    SELECT *
    FROM activities;
    `);
    console.log("Found all activities!")
    return rows;
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
  // try {
  //   console.log("Attaching Activities to Routines")

      //my code
  //   const { rows: [ activities ] } = await client.query(`
  //     SELECT * 
  //     FROM activities
  //     WHERE routines=$1;
  //   `, [routines]);

      //Ryan's code
  // //   const { rows: activities } = await client.query(`
  // //   SELECT activities.*, routine_activities.duration, 
  // //   routine_activities.count, 
  // //   routine_activities.id 
  // //   AS "routineActivityId"
  // //   FROM activities 
  // //   JOIN routine_activities 
  // //   ON routine_activities."activityId" = activities.id
  // //   WHERE routine_activities."routineId" = $1;
  // // `, [id]);
  
      //Jim's code
      // const attachActivitiesToRoutines = (routines) => {
      //   const routinesById = {};
      //   routines.forEach((routine) => {
      //     if (!routinesById[routine.id]) {
      //       routinesById[routine.id] = {
      //         id: routine.id,
      //         creatorId: routine.creatorId,
      //         isPublic: routine.isPublic,
      //         name: routine.name,
      //         goal: routine.goal,
      //         activities: [],
      //       };
      //     }
      //     const activity = {
      //       name: routine.activityName,
      //       id: routine.activityId,
      //       description: routine.description,
      //       count: routine.count,
      //       duration: routine.duration,
      //     };
      //     routinesById[routine.id].activities.push(activity);
      //   });
      
      //   return routinesById;
      // };

  //   console.log("Attached Activities to Routine!")
  //   return activities;
  // } catch (error) {
  //   console.error("Error attaching activities to routine")
  //   throw error;
  // }
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  try {
    console.log("Updating activity")
    const { rows: [ updatedActivity ] } = await client.query(`
    UPDATE activities 
    SET name = $1,
    description = $2 
    WHERE id = $3 
    RETURNING *
    `, [ id, ...fields ]);
    console.log("Successfully updated activity!")
    return updatedActivity;
  } catch (error) {
    console.error("Error updating activity")
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
