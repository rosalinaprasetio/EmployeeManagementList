const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');

//@route  GET /
//@desc   Get all employee
router.get('/', (req, res) => {
    let limit = 30; 
    var err;
    if (!req.query.minSalary || !req.query.maxSalary || !req.query.offset || !req.query.sort) {
        err = new Error("Some query parameter are missing. Please ensure you have minSalary, maxSalary, offset, and sort in your query paramater.");
        return res.status(400).json({ error: err.message });
    }
    else {

        let minSalary = req.query.minSalary.trim(); 
        let maxSalary = req.query.maxSalary.trim();
        let offset = req.query.offset.trim();
        let rsort = req.query.sort.trim();

        //console.log(rsort);
        //console.log(/^[+-]{1}(id|name|login|salary)$/.test(rsort));
        if (isNaN(Number(minSalary)) || isNaN(Number(maxSalary))) {
            err = new Error("minSalary and maxSalary should be decimal.");
        }
        else if (Number(minSalary) < 0 || Number(maxSalary) < 0 || Number(maxSalary) < Number(minSalary)) {
            err = new Error("minSalary and maxSalary should >= 0 and maxSalary should be bigger than minSalary.");
        }
        else if (!Number.isInteger(Number(offset))) {
            err = new Error("offset should be integer.");
        }
        else if (Number(offset) < 0) {
            err = new Error("offset should be >= 0.");
        }
        else if (!(/^[+-]{0,1}(id|name|login|salary)$/.test(rsort))) {
            err = new Error("Incorrect sort format. Please ensure it has + or - in front and follow by id, login, name, or salary.");
        }
    
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        else {
            //sorting
            let sortsymbol;
            let sortfield;
            if (rsort.substr(0,1) == '+' || rsort.substr(0,1) == '-') {
                sortsymbol = (rsort.substr(0,1) == '-') ? -1 : +1;
                sortfield = rsort.substr(1);
            }
            else {
                sortsymbol = +1;
                sortfield = rsort;
            }
            
            const sortObj = {};
            sortObj[sortfield] = sortsymbol;
            //console.log(sortObj);

            //query
            const queryObj = {};
            queryObj["salary"] = {};
            queryObj["salary"]["$gte"] = parseFloat(minSalary);
            queryObj["salary"]["$lte"] = parseFloat(maxSalary);
            //console.log(queryObj);

            //offset limit
            const offlimitObj = {};
            offlimitObj["limit"] = 30;
            offlimitObj["skip"] = parseInt(offset);
            //console.log(offlimitObj);

            Employee.find(queryObj, '-_id -__v', offlimitObj)
            .sort(sortObj)
            .collation({ locale: 'en', numericOrdering: true })
            .then(data => res.json({ results: data}))
            .catch(error => res.status(404).json({success:false, error}))
        }
    }
})

module.exports = router;