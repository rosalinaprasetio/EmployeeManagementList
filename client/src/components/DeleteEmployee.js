import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import EmployeeServices from "./services/EmployeeServices";
import {  Button, DialogContent, DialogContentText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: 30
  },
  button: {
      marginRight:20
  },
  buttongroup: {
    display:'flex',
    marginBottom: 20,
    justifyContent: 'center'
},
}));

const DeleteEmployee = ({employeeid, handleDeleteSubmit}) => {
  const classes = useStyles();

  const handleSubmit = async (action) => { 
    if (action === 'yes') {
        await EmployeeServices.remove(employeeid)
        .then(res => {
            handleDeleteSubmit('success',res.data.id);
        })
    }
    else {
        handleDeleteSubmit('cancel');
    }
  }

  return (
    <div className={classes.root}>
        <DialogContent dividers>
            <DialogContentText className={classes.title}>
                Do you really want to delete employee id: {employeeid}?
            </DialogContentText>
            <div className={classes.buttongroup}>
                <Button size="medium" variant="contained" color="primary" className={classes.button} onClick={() => handleSubmit('yes')} >Yes</Button>
                <Button size="medium" variant="contained" className={classes.button} onClick={() => handleSubmit('no')} >No</Button>
            </div>
        </DialogContent>
    </div>
     
  );
};

export default DeleteEmployee;