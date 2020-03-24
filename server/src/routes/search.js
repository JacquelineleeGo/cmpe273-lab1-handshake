const express = require('express');
const Job = require('../models/job');
const CompanyProfile = require('../models/companyProfile');

let router = express.Router();

router.get("/", async (req, res) => {
    const {
        keyword,
        jobCategory,
        jobLocation
    } = req.query;

    try {
        // key --> company's pid--> jobs 
        const cpArr = await CompanyProfile.where("name", "LIKE", `%${keyword}%`).fetchAll();

        const cpidArr = cpArr.map(cp => cp.id);
        // 1, 2 , 3 
        const keywordResult = await Job.query(qb => {
            qb.where("company_profile_id", "IN", cpidArr)
                .orWhere("title", "LIKE", `%${keyword}%` ) 
       });
        
        // if category is null, match every category
            // if location is null, match all locaitons
        const result = await keywordResult.where({
            ...jobCategory ? { category: jobCategory } : null, 
            ...jobLocation ? { location: jobLocation } : null
        }).fetchAll();
    
        res.json({
            error: false,
            data: result.toJSON()
        }); 
    } catch (err) {
        res.status(500).json({ error: true, data: { message: err.message } });
    }
    
});

module.exports = router;