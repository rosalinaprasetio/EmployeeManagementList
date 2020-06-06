const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('config');

const app = express();

//server is 4000 and client is 3000
app.use(cors());  

//BodyParser middleware
app.use(express.json());

//DB config
const db = config.get("mongoURI");
//connect to mongoDB
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});

//route url
app.use('/users', require('./routes/api/Users'));
app.use('/users/upload', require('./routes/api/File'));
app.use('/paginate', require('./routes/api/Paginate'));

if (process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })
}

//set port
const port = process.env.PORT || 4000;

app.listen(port, () => { console.log(`server listening on port ${port}`) })