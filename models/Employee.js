const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})
                        
module.exports = Employee = mongoose.model('employee', EmployeeSchema)