const express = require('express');
const Promise = require('bluebird');

const bookshelf = require('../models/bookshelf');
const StudentProfile = require('../models/studentProfile');
const Profile_basic = require('../models/basicProfile');
const Profile_education = require('../models/educationProfile');
const Profile_experience = require('../models/experienceProfile');

const JobApplication = require('../models/jobApplication');
const Event = require('../models/event');
const EventRegistration = require('../models/eventRegistration');

let router = express.Router();

router
  .route('/:uid') // user id  -> profile id
  .get(async (req, res) => {
    const {
      params: { uid },
    } = req;

    try {
      const userData = await StudentProfile.where('student_user_id', uid).fetch({
        withRelated: ['profileBasic', 'profileEducation', 'profileExperience'],
      });

      res.json({
        error: false,
        data: userData,
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })
  .post(async (req, res) => {
    const {
      params: { uid },
      body,
    } = req;

    const { basic, education, experience } = body;

    bookshelf
      .transaction(t => {
        return StudentProfile.forge({ student_user_id: uid })
          .save(null, { transacting: t })

          .tap(userProfile => {
            return Profile_basic.forge({
              student_profile_id: userProfile.id,
              ...basic,
            }).save(null, { transacting: t });
          })

          .tap(userProfile => {
            return Profile_education.forge({
              student_profile_id: userProfile.id,
              ...education,
            }).save(null, { transacting: t });
          })

          .tap(userProfile => {
            return Promise.map(experience, exp => {
              return Profile_experience.forge({
                student_profile_id: userProfile.id,
                ...exp,
              }).save(null, { transacting: t });
            });
          });
      })
      .then(async profileModel => { 
        // get result from
        const profile = await profileModel.refresh({
          withRelated: ['profileBasic', 'profileEducation', 'profileExperience'],
        });
        res.json({
          error: false,
          data: profile.toJSON(),
        });
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  .put(async (req, res) => {
    const {
      params: { uid },
      body,
    } = req;

    const { basic, education, experience } = body;

    bookshelf
      .transaction(t => {
        return StudentProfile.forge({ student_user_id: uid })
          .fetch(null, { transacting: t })
          .tap(function (userProfileModel) {
            return Profile_basic.forge({
              student_profile_id: userProfileModel.id,
            })
              .fetch(null, { transacting: t })
              .then(model => {
                return model.save({ ...basic });
              });
          })
          .tap(function (userProfileModel) {
            return Profile_education.forge({
              student_profile_id: userProfileModel.id,
            })
              .fetch(null, { transacting: t })
              .then(model => {
                return model.save({ ...education });
              });
          })
          .tap(function (_) {
            return Promise.map(experience, exp => {
              return Profile_experience.forge({
                id: exp.id, // matching row
              })
                .fetch(null, { transacting: t })
                .then(model => {
                  return model.save({ ...exp });
                });
            });
          });
      })
      .then(async profileModel => {
        const profile = await profileModel.refresh({
          withRelated: ['profileBasic', 'profileEducation', 'profileExperience'],
        });

        res.json({
          error: false,
          data: profile.toJSON(),
        });
      })
      .catch(err => {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  .delete(async (req, res) => {
    const {
      params: { uid },
    } = req;

    try {
      const profile = await StudentProfile.forge({ student_user_id: uid }).fetch();
      await profile.destroy();

      res.json({
        error: false,
        data: {
          message: 'delete success',
        },
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  });

router.post("/:uid/job/:jid/apply", async (req, res) => {
  const { uid, jid } = req.params;

  const { resume } = req.body;

  try {
    const profile = await StudentProfile.forge({ "student_user_id": uid }).fetch();

    const result = await JobApplication.forge({
      job_id: jid,
      student_profile_id: profile.id,
      resume: resume,
    }).save();

    res.json({ error: false, data: result.toJSON()})

  } catch (err) {
    res.status(500).json({ error: true, data: { message: err.message } });
  }
})

router.get("/:uid/applications", async(req, res) => {
  const { uid } = req.params;

  try {
    const profile = await StudentProfile.forge({"student_user_id": uid}).fetch();
    const result = await JobApplication.forge({"student_profile_id": profile.id}).fetchAll();
    
    res.json({
      error:false,
      data: result.toJSON()
    })

  } catch (err){
    res.status(500).json({ error: true, data: { message: err.message } });
  }
})

router.post("/:uid/event/:eid/register", async (req, res) => {
  const { uid, eid } = req.params;

  try {
    const profileEducation = await StudentProfile.forge({ 
      "student_user_id": uid 
    }).fetch({withRelated: ["profileEducation"]});

    if(!profileEducation){
      return res.json({
        error:true,
        data: "Please add your education information before registering an event."
      });
    }

    const event = await Event.forge({
      id: eid
    }).fetch();


    const match = await Event.query(qb => {
      qb.where( profileEducation.major, "=", event.event_major ) 
     });

    if(match){
      const result = await EventRegistration.forge({
        event_id: eid,
        student_profile_id: profileEducation.profile_id,
      }).save();

      return res.json({ error: false, data: result.toJSON() });    
    }

    res.json({
      error:true,
      data: "Event can't be registered if user major isn't allowed"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, data: { message: err.message } });
  }
});

module.exports = router;
