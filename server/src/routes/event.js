const express = require("express");
let router = express.Router();
const Event = require('../models/event');
const CompanyProfile = require('../models/companyProfile');

// get event just by its id, cause it's unique
  router.get("/:eid", async (req, res) => { 
    const {
        params: { eid}
      } = req;

    try {
      const result = await Event.where({"id": eid}).fetch();
      // const result = await Event.where({"id": jid, "company_profile_id": uid}).fetch();

      res.json({
        error: false,
        data: result.toJSON()
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })


  router.post("/:uid", async (req, res) => {
    const {
        params: { uid }
      } = req;

    try {
      const companyProfile = await CompanyProfile.forge({ company_user_id: uid }).fetch();

      const event = await Event.forge({
        company_profile_id: companyProfile.id,
        ...req.body
      }).save();

      res.json({
        error: false,
        data: event.toJSON()
      });
    } catch (err) {
      res.status(500).json({ error: true, data: { message: err.message } });
    }
  })


  router.put("/:eid", async (req, res) => {
    const {
      params: { eid }
    } = req;

    try {
      const result = await Event.forge({ id: eid }).fetch();

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

  router.delete("/:eid", async (req, res) => {
    const {
      params: { eid }
    } = req;

    try {
      const result = await Event.forge({ id: eid }).fetch();

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
