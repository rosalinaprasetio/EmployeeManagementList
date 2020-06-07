const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');

//@route  GET /:id
//@desc   Get an employee
router.get('/:id', (req, res) => {
    Employee.find({ id: req.params.id }, '-_id -__v')
    .then(data => res.json({ results: data}))
    .catch(error => res.status(404).json({success:false, error}))
})

//@route  POST /:id
//@desc   Create an employee
router.post('/:id', (req, res) => {
    const newEmploye = new Employee({
        id: req.params.id,
        login: req.body.login,
        name: req.body.name,
        salary: req.body.salary
    });
    newEmploye.save()
    .then(data => {
        res.json({ results: [{ id:data.id, login:data.login, name:data.name, salary:data.salary }] })
    })
    .catch(error => res.status(404).json({success:false, error}))
})

//@route  PATCH /:id
//@desc   Update an employee
router.patch('/:id', (req, res) => {
    var query = { id: req.params.id },
    update = { login: req.body.login, name: req.body.name, salary: req.body.salary },
    options = { new:true, upsert: false };

    Employee.findOneAndUpdate(query, update, options)
    .then(data => {
        res.json({ results: [{ id:data.id, login:data.login, name:data.name, salary:data.salary }] })
    })
    .catch(error => res.status(404).json({success:false, error}))
})

//@route  DELETE /:id
//@desc   delete an employee
router.delete('/:id', (req, res) => {
    Employee.findOne({ id: req.params.id })
    .then(
        data => data.remove()
        .then((data) => {
            res.json({ results: [{ id:data.id, login:data.login, name:data.name, salary:data.salary }] })
        })
    )
    .catch(err => res.status(404).json({success:false, err}))
})

module.exports = router;