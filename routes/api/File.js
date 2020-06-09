const multer = require("multer");
const express = require("express");
const path = require("path");
const router = express.Router();
const config = require('config');
const fs = require("fs");
const csv = require('fast-csv');
const Employee = require('../../models/Employee');

//@route  POST /
//@desc   Upload csv file
const upload = multer({ 
    dest: 'tmp/csv/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'text/csv') {
          return cb(null, false, new Error("Only csv file is allowed."));
        }
        cb(null, true);
      }
}).single('file');

var lockedupload;
router.post('/', function (req, res) {    
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (req.file) fs.unlinkSync(req.file.path);   // remove temp file
      lockedupload = false;
      return res.status(400).json({ error: err });
    } else if (err) {
      if (req.file) fs.unlinkSync(req.file.path);   // remove temp file
      lockedupload = false;
      return res.status(400).json({ error: err });
    }
      
    if (lockedupload) {
      if (req.file) fs.unlinkSync(req.file.path);   // remove temp file
      return res.status(401).json({ error: 'Another file is being uploaded. Please wait a few moment and try again.' })
    }
    else {
      lockedupload = true;

      try {

        const fileRows = [];
        let err;
        const rowid = [];
        const rowlogin = [];

        let parser = csv.parse({ 
          headers: true,
          ignoreEmpty: true,
          comment: '#',
          strictColumnHandling: true,
          trim: true
        });

        fs.createReadStream(req.file.path)
        .pipe(parser)
        .on('error', (error) => console.error(error))
        .on('data-invalid', function(data){ 
          err = new Error("Upload failed. Some field are mismatch.");
          parser.end();
        })
        .on('data', function (data) {
            if (data.id === "" || data.login === "" || data.name === "" || data.salary === "") {
              err = new Error("Upload failed. Some field are empty.");
              parser.end();
            }

            if (!(/^[a-z0-9]+$/i.test(data.id))) {
              err = new Error("Upload failed. Some id field is not alphanumeric.");
              parser.end();
            }

            if (!(/^[a-z0-9]+$/i.test(data.login))) {
              err = new Error("Upload failed. Some login field is not alphanumeric.");
              parser.end();
            }

            if (isNaN(Number(data.salary))) {
              err = new Error("Upload failed. Some salary field have incorrect format.");
              parser.end();
            }
            else if (Number(data.salary) < 0) {
                err = new Error("Upload failed. Some salary field have incorrect value (value should >= 0).");
                parser.end();
            }

            if (!rowid[data.id]) {
              rowid[data.id] = 1;
            }
            else {
              err = new Error("Upload failed. Duplicate employee id.");
              parser.end();
            }

            if (!rowlogin[data.login]) {
              rowlogin[data.login] = 1;
            }
            else {
              err = new Error("Upload failed. Duplicate employee login.");
              parser.end();
            }

            fileRows.push(data); // push each row  
        })
        .on('end', function () {
            if (!err) {
              if (fileRows.length == 0) {
                err = new Error("Upload failed. File empty.")
              }
            }

            if (err) {
              if (req.file) fs.unlinkSync(req.file.path);   // remove temp file
              lockedupload = false;
              return res.status(400).json({ error: err.message });
            }
            else {
              //console.log(fileRows);

              //save to db
              var errormessage = '';
              var successcount = 0;
              var errorcount = 0;

              function saveUpdate(obj) {
                  return new Promise((resolve, reject) => {
                    var query = { id: obj.id },
                    update = { login: obj.login, name: obj.name, salary: obj.salary },
                    options = { new:true, upsert: true };

                    Employee.findOneAndUpdate(query, update, options)
                      .then(result => {
                        successcount += 1;
                        resolve(result);
                      })
                      .catch(err => {
                        errorcount += 1;
                        resolve();
                      })
                    });
              }

              let promiseArr = [];
              for (let i = 0; i < fileRows.length; i++) {
                promiseArr.push(saveUpdate(fileRows[i]));
              }

              Promise.all(promiseArr)
              .then((result) => {
                //console.log(successcount, errorcount);
                if (req.file) fs.unlinkSync(req.file.path);   // remove temp file
                lockedupload = false;
                return res.status(200).json({ message: `Upload successful. ${successcount} updated, ${errorcount} not updated.` })
              })
              .catch(err => { 
                //console.log(err);
                if (req.file) fs.unlinkSync(req.file.path);   // remove temp file
                lockedupload = false;
                return res.status(400).json({ error: "Upload failed. Database error." });
              })

            }
        })
      }
      catch(err) {
        //console.log(err);
        if (req.file) fs.unlinkSync(req.file.path);   // remove temp file
        lockedupload = false;
        return res.status(400).json({ error: "Upload failed. Only csv file is allowed." });
      }
    }
  })
 });

module.exports = router;