const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');

//@route  GET /paginate
//@desc   Pagination
router.get('/', (req, res, next) => {
    let pageOptions = {
      page: parseInt(req.query.page.trim()) || 0,
      limit: parseInt(req.query.rowsperpage.trim()) || 2,
      sort: req.query.sort.trim() || 'id',
      minSalary:req.query.minSalary.toString().trim(),
      maxSalary:req.query.maxSalary.toString().trim(),
    };

    const queryObj = {};
    if (pageOptions.minSalary || pageOptions.maxSalary) {
      queryObj["salary"] = {};
      if (pageOptions.minSalary)
        queryObj["salary"]["$gte"] = parseFloat(pageOptions.minSalary);
      if (pageOptions.maxSalary)
      queryObj["salary"]["$lte"] = parseFloat(pageOptions.maxSalary);
    }
    //console.log(queryObj);
   
    if (req.query.page) {
      Employee.paginate(
        queryObj,
        {
          offset: pageOptions.page * pageOptions.limit,
          limit: pageOptions.limit,
          sort: pageOptions.sort,
          collation: {
              locale: 'en',
              numericOrdering: true
          }
        },
        (err, result) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            res.status(200).json(result);
          }
        }
      );
    }
  });
  

module.exports = router;