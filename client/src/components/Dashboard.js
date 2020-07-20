import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

}));

const UploadEmployee = () => {
  const classes = useStyles();

  return (
    <>
        <div className={classes.toolbar} />
        <Alert variant="outlined" severity="info">
            <AlertTitle>Notification</AlertTitle>
            There is no notification today.
        </Alert>
        
    </>
     
  );
};

export default UploadEmployee;