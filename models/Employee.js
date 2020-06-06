const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

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

EmployeeSchema.plugin(mongoosePaginate);
                        
module.exports = Employee = mongoose.model('employee', EmployeeSchema)