const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');

//@route  GET /
//@desc   Get all employee
router.get('/', (req, res) => {
    Employee.find()
    .sort({ date: -1 })  //1 is ascending, -1 is descending
    .then(data =>res.json(data))
})


module.exports = router;