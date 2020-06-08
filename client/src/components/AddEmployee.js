import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import EmployeeServices from "./services/EmployeeServices";
import Alert from '@material-ui/lab/Alert';
import {  Button, TextField, InputAdornment, DialogContent } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    marginBottom:20
  },
  form: {
    marginBottom:20
  },
  button: {
      marginTop:20
  },
  warning: {
      marginBottom:20
  }
}));

const AddEmployee = ({handleCreateSubmit}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [login, setLogin] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState();
  const [errorId, setErrorId] = useState();
  const [errorName, setErrorName] = useState();
  const [errorLogin, setErrorLogin] = useState();
  const [errorSalary, setErrorSalary] = useState();

  const handleChange = (e, property) => {
    if (property === 'name') {
        setName(e.target.value);
    }
    else if (property === 'id') {
      if (!(/^[a-z0-9]+$/i.test(e.target.value))) {
        setErrorId('Value should be alphanumeric.');
      }
      else {
        setErrorId();
      }
      setId(e.target.value);
  }
    else if (property === 'login') {
      if (!(/^[a-z0-9]+$/i.test(e.target.value))) {
        setErrorLogin('Value should be alphanumeric.');
      }
      else {
        setErrorLogin();
      }
      setLogin(e.target.value);
    }
    if (property === 'salary') {
        const value = e.target.value;
        if (isNaN(Number(value))) {
            setErrorSalary('Value should be decimal.');
        }
        else if (Number(value) < 0) {
            setErrorSalary('Value should >= 0.0');
        }
        else {
            setErrorSalary();
        }
        setSalary(value.toString());
    }
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (!errorId && !errorName && !errorLogin && !errorSalary) { 
        if (!id || !name || !login || !salary) {
            setMessage('Please fill all fields.')
        }
        else {
            setMessage();
            await EmployeeServices.create(id, { id, name, login, salary: salary.toString()})
            .then(res => {
                //console.log(res);
                handleCreateSubmit(res.data.id);
            })
            .catch(err => {
                setMessage(err.response.data.error);
            })
        }
    }

  }

  return (
    <div className={classes.root}>
        <DialogContent dividers>
          <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
            { message ? (<Alert severity="error" className={classes.warning}>{message}</Alert>): ('') }
            <TextField required margin="dense" id="id" label="ID"
                fullWidth error={errorId ? true : false} size="small" 
                color="primary" value={id} variant="outlined" helperText={errorId} onChange={(e) => handleChange(e,'id')} />
            <TextField required margin="dense" id="login" label="Login"
                fullWidth error={errorLogin ? true : false} size="small" 
                color="primary" value={login} variant="outlined" helperText={errorLogin} onChange={(e) => handleChange(e,'login')} />
            <TextField required margin="dense" id="name" label="Name"
                fullWidth error={errorName ? true : false} size="small" 
                color="primary" value={name} variant="outlined" helperText={errorName} onChange={(e) => handleChange(e,'name')} />
            <TextField required margin="dense" id="salary" label="Salary"
                fullWidth error={errorSalary ? true : false} size="small" 
                color="primary" value={salary} InputProps={{startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
                variant="outlined" helperText={errorSalary} onChange={(e) => handleChange(e,'salary')} />
            <Button type="submit" size="medium" variant="contained" color="primary" className={classes.button} >Submit</Button>
          </form>
        </DialogContent>
    </div>
     
  );
};

export default AddEmployee;