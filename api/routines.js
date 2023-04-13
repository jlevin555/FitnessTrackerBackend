const express = require('express');
const routinesRouter = express.Router();
const {
	getAllPublicRoutines,
	createRoutine,
	updateRoutine,
	destroyRoutine,
	getRoutineById
} = require('../db/routines');
const { addActivityToRoutine, getRoutineActivitiesByRoutine } = require('../db/routine_activities');
const { requireUser } = require('./require');
const { getUserById } = require('../db/users');

routinesRouter.get('/', async (req, res, next) => {
	try {
		const publicRoutines = await getAllPublicRoutines();
		res.send(publicRoutines);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

routinesRouter.post('/', requireUser, async (req, res, next) => {
	const { isPublic, name, goal } = req.body;
	const creatorId = req.user.id;

	try {

		if (creatorId && isPublic && name && goal) {
			const newRoutine = await createRoutine({
				creatorId,
				name,
				goal
			});
			res.send(newRoutine);
		} else {
			res.send({ message: 'Missing fields' });
		}
	} catch ({ name, message }) {
		next({ name, message });
	}
});

routinesRouter.patch('/:routineId', requireUser, async (req, res, next) => {
	const { routineId } = req.params;
	const creatorId = req.user.id;
	const user = await getUserById(creatorId)
	const routineName = await getRoutineById(routineId)
	
	try {

		if (user.id !== routineName.creatorId) {
			next({ 
				error: "Incorrect user",
				message: `User ${user.username} is not allowed to update ${routineName.name}`,
				name: "Error"
			});
		}

		if (Object.keys(req.body).length === 0) {
			throw Error('No update fields');
		}

		const updateFields = { id: routineId, ...req.body };
		console.log(updateFields);
		const updatedRoutine = await updateRoutine(updateFields);
		res.send(updatedRoutine);
	} catch ({ name, message }) {
		next({ name, message });
	}
});

routinesRouter.delete('/:routineId', requireUser, async (req, res, next) => {
		
	try {
		console.log('AAAAA', req.user)
		const creatorId = req.user.id;
		const { routineId } = req.params;
		const routineName = await getRoutineById(routineId)
		if (req.user.id !== routineName.creatorId) {
            res.status(403).send({ 
				error: "Incorrect user",
				message: `User ${req.user.username} is not allowed to delete ${routineName.name}`,
				name: "Error"
			});
		} else {

		const deletedRoutine = await destroyRoutine(routineId);
		res.send(deletedRoutine);
		}
	} catch ({ name, message }) {
		next({ name, message });
	}
});


routinesRouter.post('/:routineId/activities', async (req, res, next) => {
	const { activityId, count, duration } = req.body;
	const { routineId } = req.params;
	try { 
  
	const checkRoutine = await getRoutineById(routineId) 
	console.log("checkRoutine3", checkRoutine)
	
	const routineActivities = await getRoutineActivitiesByRoutine({ id: routineId });
	console.log("routineActivities", routineActivities);
  
	const duplicateActivity = routineActivities.find(activity => activity.activityId === activityId);
	console.log("duplicateActivity", duplicateActivity);
  
	if (duplicateActivity && checkRoutine) {
		res.send({
				error: "DuplicateError",
				message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
				name: "CannotAddDuplicateActivity",
			});
	} else{
  
	const addedActivity = await addActivityToRoutine({routineId, activityId, count, duration});
	res.send(addedActivity)
  
	}
	} catch (error) {
	next (error)
	}
  })

module.exports = { routinesRouter };

routinesRouter.get('/', async(req, res, next) => {
    try {
        const publicRoutines = await getAllPublicRoutines();
        res.send(publicRoutines);
    } catch({ name, message }) {
        next({ name, message });
    }
});

