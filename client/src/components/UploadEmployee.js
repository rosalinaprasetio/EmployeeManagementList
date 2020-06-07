import React, { useState, useEffect } from "react";
import UploadFile from "./services/UploadServices";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, LinearProgress, Box, Snackbar, IconButton } from '@material-ui/core';
import Menubar from './Menubar.js';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  progress: {
    width: '100%',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    marginBottom:20
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UploadEmployee = () => {
  const classes = useStyles();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [fileSelected, setfileSelected] = useState();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    setfileSelected(e.target.files)
  }

  const handleUpload = (e) => { 
    e.preventDefault();

    if (fileSelected) {
      let data = new FormData();
      data.append('file', fileSelected[0]);
      
      setLoading(true);
      setStatus('');

      axios.post("http://localhost:4000/users/upload", data, {
          onUploadProgress: ProgressEvent => {
            setProgress(ProgressEvent.loaded / ProgressEvent.total*100)
          },
      })
      .then(res => {
          //console.log(res);
          setLoading(false);
          setStatus('success');
          setMessage(res.data.message);
          setOpen(true);
          setProgress(0);
          setfileSelected();
      })
      .catch(err => {
          //console.log(err.response)
          setLoading(false);
          setStatus('error');
          setMessage(err.response.data.error);
          setOpen(true);
          setProgress(0);
          setfileSelected();
      })
    }
    else {
      setStatus('error');
      setMessage('No file selected.');
      setOpen(true);
      setProgress(0);
    }
    
  }

  return (
    <div className={classes.root}>
      <Menubar/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h6" noWrap className={classes.title}>
          Upload CSV
        </Typography>
        <div>
            {
                loading ? (
                    <div>
                    <div className={classes.progress}>
                      <LinearProgressWithLabel value={progress} />
                    </div>
                    </div>
                ) : (
                    <form onSubmit={handleUpload}>
                        <div className="form-group"> 
                        <input className="form-control" type="file" accept=".csv" onChange={handleChange} />
                        </div>
                        <button className="btn btn-success">Upload</button>
                    </form>
                )
            }
            <Snackbar open={open} autoHideDuration={5000} key={'top center'}
              anchorOrigin={{ vertical: 'top', horizontal: 'center'}} onClose={handleClose}>
              <Alert onClose={handleClose} severity={status}>
                {message}
              </Alert>
            </Snackbar>
        </div>
      </main>
    </div>
     
  );
};

export default UploadEmployee;