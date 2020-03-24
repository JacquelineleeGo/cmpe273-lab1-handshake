const express = require("express");

const CompanyProfile = require("../models/companyProfile");

const Job = require("../models/job");
const JobApplication = require("../models/jobApplication");

let router = express.Router();

// uid  === user.id  <--- company_profile.company_user_id
router
  .route("/:uid")
  .get(async (req, res) => {
    const {
      params: { uid }
    } = req;

    try {
      // This is not working
      // const result = await CompanyProfile.where("company_user_id", uid).fetch({
      //   withRelated: ["user"]
      // });  // get company profile based on user id

      const result = await CompanyProfile.where("company_user_id", uid).fetch();  // get company profile based on user id

      res.json({
        error: false,
        data: result.toJSON()
      });

    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })
  .post(async (req, res) => {
    const {
      params: { uid }
    } = req;

    try {
      const companyProfile = await CompanyProfile.forge({
        company_user_id: uid,
        ...req.body
      }).save();

      res.json({
        error: false,
        data: companyProfile.toJSON()
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })
  .put(async (req, res) => {
    const {
      params: { uid }
    } = req;

    try {
      const companyProfile = await CompanyProfile.forge({ company_user_id: uid }).fetch();

      await companyProfile.save({ ...req.body });

      res.json({
        error: false,
        data: companyProfile.toJSON()
      });

    } catch (err) {
      res.status(500).json( { error: true, data: { message: err.message } });
    }
  })
  .delete(async (req, res) => {
    const {
      params: { uid }
    } = req;

    try {
      const companyProfile = await CompanyProfile.forge({ company_user_id: uid }).fetch();

      await companyProfile.destroy();

      res.json({ error: false, data: { message: "success deleted!" } });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })


// list all jobs/events  
// /company/:uid/job 
router.get("/:uid/job", async (req, res) => {
  const {
    params: { uid }
  } = req;

  try {
    // we first find the company_profile_id based on user id
    // then use company_profile_id to find all the jobs
    // const companyProfile = await CompanyProfile.forge({
    //   "company_user_id": uid })
    // .fetch({ withRelated: ["user"]});

    const companyProfile = await CompanyProfile.forge({ company_user_id: uid }).fetch();

    //const companyProfileOBJ = JSON.parse(companyProfile.toJSON()); // no need to

    const result = await Job.forge("company_profile_id", companyProfile.id).fetchAll();

    res.json({ error: false, data: result.toJSON() })

  } catch (err) {
    res.status(500).json({ error: true, data: { message: err.message }})
  }
})

// or use this route job/:jid/application as to jid is globally unique
// job application has: jid, profile_id, resume
router.get("/:uid/job/:jid/application", async (req, res) => {
  const { uid, jid } = req.params;

  try {
    // const company = await CompanyProfile.forge({company_user_id: uid}).fetch();
    // console.log(jid);
    const result = await JobApplication.where( {"job_id": jid }).fetchAll();

    res.json({
      error: false,
      data: result.toJSON()
    })
  } catch (err){
    res.status(500).json({ error: true, data: { message: err.message } });
  }
})

// change status
router.put("/:uid/job/:jid/application/:aid", async (req, res) => {
  // company get the application, 
  // review student profile(link), resume

  const { aid, jid} = req.params;

  try {
    const result = await JobApplication.forge({id: aid, job_id:jid}).fetch();
    await result.save({ ...req.body });

    res.json({
      error:false,
      data: result.toJSON()
    })

  } catch (err){
    res.status(500).json({ error: true, data: { message: err.message } });
  }
})

router.get("/:uid/job/:jid/application/:aid", async (req, res) => {
  // company get the application, 
  // review student profile(link), resume
  const { aid } = req.params;

  try {
    const result = await JobApplication.forge({"id": aid}).fetch();
    
    res.json({
      error:false,
      data: result.toJSON()
    })

  } catch (err){
    res.status(500).json({ error: true, data: { message: err.message } });
  }
})

// get all events
router.get("/:uid/event", async (req, res) => {
  const {
    params: { uid }
  } = req;

  try {
    const companyProfile = await CompanyProfile.forge({ company_user_id: uid }).fetch();
    const result = await Event.forge("company_profile_id", companyProfile.id).fetchAll();

    res.json({ error: false, data: result.toJSON() })

  } catch (err) {
    res.status(500).json({ error: true, data: { message: err.message }})
  }});

// get all registration from that event
  router.get("/:uid/event/:eid/registration", async (req, res) => {
    const { eid } = req.params;
  
    try {
      const result = await EventRegistration.forge({ event_id: eid }).fetchAll();
  
      res.json({ error: false, data: result.toJSON() })
    } catch (err){
      res.status(500).json({ error: true, data: { message: err.message } });
    }

  });

module.exports = router;
