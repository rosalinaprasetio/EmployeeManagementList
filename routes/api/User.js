const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');

//@route  GET /:id
//@desc   Get an employee
router.get('/:id', (req, res) => {
    Employee.find({ id: req.params.id }, '-_id -__v')
    .then(data => res.json({ id:data[0].id, login:data[0].login, name:data[0].name, salary:data[0].salary }))
    .catch(error => res.status(400).json({success:false, error}))
})

//@route  POST /:id
//@desc   Create an employee
router.post('/:id', (req, res) => {
    var err;
    if (!req.body.id || !req.body.login || !req.body.name || !req.body.salary) {
        err = new Error("Some parameter are missing. Please ensure you have employee id, login, name, and salary.");
        return res.status(400).json({ error: err.message });
    }
    else { 
        let id = req.body.id.trim()
        let login = req.body.login.trim()
        let name = req.body.name.trim()
        let salary =  req.body.salary.toString().trim()

        if (!(/^[a-z0-9]+$/i.test(id))) {
            err = new Error("id should be alphanumeric.");
        }

        if (!err) {
            if (!(/^[a-z0-9]+$/i.test(login))) {
                err = new Error("login should be alphanumeric.");
            }
        }

        if (!err) {
            if (isNaN(Number(salary))) {
                err = new Error("salary should be decimal.");
            }
            else if (Number(salary) < 0) {
                err = new Error("salary should >= 0.");
            }
        }

        if (err) {
            return res.status(400).json({ error: err.message });
        }
        else {
            const newEmploye = new Employee({
                id: id,
                login: login,
                name: name,
                salary: parseFloat(salary)
            });
            newEmploye.save()
            .then(data => {
                res.json({ id:data.id, login:data.login, name:data.name, salary:data.salary })
            })
            .catch(error => res.status(400).json({success:false, error:"ID/Login has been used by another user. Please ensure you have unique id/login field."}))
        }
    }
})

//@route  PATCH /:id
//@desc   Update an employee
router.patch('/:id', (req, res) => {
    var err;
    //console.log(req);
    if (!req.params.id || !req.body.login || !req.body.name || !req.body.salary) {
        err = new Error("Some parameter are missing. Please ensure you have employee id, login, name, and salary.");
        return res.status(400).json({ error: err.message });
    }
    else {  
        let id = req.params.id.trim()
        let login = req.body.login.trim()
        let name = req.body.name.trim()
        let salary =  req.body.salary.toString().trim()

        if (!(/^[a-z0-9]+$/i.test(id))) {
            err = new Error("id should be alphanumeric.");
        }

        if (!err) {
            if (!(/^[a-z0-9]+$/i.test(login))) {
                err = new Error("login should be alphanumeric.");
            }
        }

        if (!err) {
            if (isNaN(Number(salary))) {
                err = new Error("salary should be decimal.");
            }
            else if (Number(salary) < 0) {
                err = new Error("salary should >= 0.");
            }
        }

        if (err) {
            return res.status(400).json({ error: err.message });
        }
        else {
            var query = { id: id },
            update = { login: login, name: name, salary: parseFloat(salary)},
            options = { new:true, upsert: false };

            Employee.findOneAndUpdate(query, update, options)
            .then(data => {
                res.json({ id:data.id, login:data.login, name:data.name, salary:data.salary })
            })
            .catch(error => res.status(400).json({success:false, error:"Login has been used by another user. Please ensure you have unique login field."}))
        }
    }
})

//@route  DELETE /:id
//@desc   delete an employee
router.delete('/:id', (req, res) => {
    Employee.findOne({ id: req.params.id })
    .then(
        data => data.remove()
        .then((data) => {
            res.json({ id:data.id, login:data.login, name:data.name, salary:data.salary })
        })
    )
    .catch(err => res.status(400).json({success:false, err:"Failed deleting employee."}))
})

module.exports = router;