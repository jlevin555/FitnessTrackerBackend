const express = require('express');
const apiRouter = express.Router();

const { verify } = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/users');

const requireUser = (req, res, next) => {
    if(!req.user) {
        next({
            name: 'AuthError',
            message: 'You must be logged in to perform this action'
        });
    } else {
        console.log('User is set');
        return next();
    }
};

apiRouter.use('/', async (req, res, next) => {
    const auth = req.header('Authorization');

    if(!auth) {
        return next();
    }

    if (auth.startsWith('Bearer')) {
        const token = auth.slice('Bearer'.length);
        try{
            const { id } = verify(token, JWT_SECRET);
            if(id) {
                req.user = await getUserById(id);
                return next();
            }
        } catch({ name, message }) {
            next({ name, message });
        }
    } else {
        next({ name: 'AuthError', message: 'Error in authorization format'});
    }
});

// GET /api/health
apiRouter.get('/health', async (req, res, next) => {
    res.send({ message: 'Server is up and running!' })
});

// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
apiRouter.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
apiRouter.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
apiRouter.use('/routine_activities', routineActivitiesRouter);

module.exports = { 
    apiRouter,
    requireUser
};
