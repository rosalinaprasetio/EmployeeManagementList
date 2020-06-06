const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');

//@route  GET /paginate
//@desc   Pagination
router.get('/', (req, res, next) => {
    let pageOptions = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.rowsperpage) || 2,
      sort: req.query.sort
    };
   
    if (req.query.page) {
      Employee.paginate(
        {},
        {
          offset: pageOptions.page * pageOptions.limit,
          limit: pageOptions.limit,
          sort: pageOptions.sort,
          collation: {
              locale: 'en'
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