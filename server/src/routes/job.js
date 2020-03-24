const express = require("express");
let router = express.Router();
const Job = require('../models/job');
const CompanyProfile = require('../models/companyProfile');

// get job just by its id, cause it's unique
  router.get("/:jid", async (req, res) => { 
    const {
        params: { uid, jid}
      } = req;

    try {
      const result = await Job.where({"id": jid}).fetch();
      // const result = await Job.where({"id": jid, "company_profile_id": uid}).fetch();

      res.json({
        error: false,
        data: result.toJSON()
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })

  
  // company's id 
  // 
  router.post("/:uid", async (req, res) => {
    const {
        params: { uid }
      } = req;

      // console.log(req);

    try {
      // console.log("before forge");
      // const companyProfile1 = CompanyProfile.forge({ id: uid });
      // //const companyProfile1 = CompanyProfile.forge({ company_user_id: uid });
      // console.log("before fetch");
      // const companyProfile2 = companyProfile1.fetch();
      // console.log("before await");
      // const companyProfile = await companyProfile2;
      const companyProfile = await CompanyProfile.forge({ company_user_id: uid }).fetch();
      // console.log("after await");

      
      const job = await Job.forge({
        company_profile_id: companyProfile.id,
        ...req.body
      }).save();

      res.json({
        error: false,
        data: job.toJSON()
      });
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })


  router.put("/:jid", async (req, res) => {
    const {
      params: { jid }
    } = req;

    try {
      const result = await Job.forge({ id: jid }).fetch();

      await result.save({
        ...req.body
      });

      res.json({
        error: false,
        data: result.toJSON()
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })

  router.delete("/:jid", async (req, res) => {
    const {
      params: { jid }
    } = req;

    try {
      const result = await Job.forge({ id: jid }).fetch();

      await result.destroy();

      res.json({
        error: false,
        data: {
          message: "success deleted!"
        }
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })


module.exports = router;
