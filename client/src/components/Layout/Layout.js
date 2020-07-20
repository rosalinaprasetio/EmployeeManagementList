import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import Menubar from '../Menubar'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  }));

const Layout = (props) => { 
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Menubar />
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    );
}
 
export default Layout;