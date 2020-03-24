const express = require('express');

const user = require('./user');
const studentProfile = require('./studentProfile');
const job = require('./job')
const event = require('./event');
const companyProfile = require('./companyProfile');
const search = require('./search');

const jwtAuth = require('../middleware/jwt');

const router = express.Router();

router.use(jwtAuth);

router.use('/user', user);

router.use('/student', studentProfile);

router.use('/company', companyProfile);

router.use('/job', job);

router.use('/event', event)

router.use('/search', search);

// router.use("/job/:cid/:jid/applications") --> company GET applicaitons related to a job with jid
// /job/:jid/application -- company PUT to change status


router.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
        code: 401,
        message: 'invalid token',
        data: err
      });
    } else {
      res.status(err.status || 500).json({
        code: err.status || 500,
        message: err.message,
        data: err
      });
    }
  });
  
module.exports = router;
  


