const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    console.log('Adding new routine to activity')
    const { rows } = await client.query(`
    INSERT INTO rows(routineId, activityId, count, duration)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [routineId, activityId, count, duration])
    console.log("Added new routine to activity!")
    return rows;
  } catch (error) {
    console.error("Error adding new routine to activity")
    throw error;
  }
}

async function getRoutineActivityById(id) {}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM routine_activities 
    WHERE "routineId" = $1;
    `, [id]);
    console.log("Found routine activity by routine!")
    return rows;
  } catch (error) {
    console.error("Error getting routine activities by activity")
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
