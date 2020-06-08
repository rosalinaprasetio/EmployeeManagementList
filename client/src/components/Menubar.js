import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Drawer, Hidden, List, ListItem, ListItemIcon, 
  ListItemText, Toolbar, IconButton, Typography, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PublishIcon from '@material-ui/icons/Publish';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
},
drawer: {
    [theme.breakpoints.up('md')]: {
    width: drawerWidth,
    flexShrink: 0,
    },
},
appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#000080' 
},
menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
    display: 'none',
    },
},
// necessary for content to be below app bar
toolbar: theme.mixins.toolbar,
drawerPaper: {
    width: drawerWidth,
},
content: {
    flexGrow: 1,
    padding: theme.spacing(3)
},
table: {
    minWidth: 500,
},
title: {
    marginBottom:20
},
visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
},
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}



const Menubar = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const drawer = (
        <div>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItemLink href="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemLink>
          </List>
          <Divider />
          <List>
            <ListItemLink href="/upload">
              <ListItemIcon><PublishIcon /></ListItemIcon>
              <ListItemText primary="Upload CSV" />
            </ListItemLink>
          </List>
          <Divider />
        </div>
    );

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap >
                Ros Tech Hunt
            </Typography>
            </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="menu">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden mdUp implementation="css">
            <Drawer
                
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
            </Hidden>
        </nav>
      </div>
    );
}
 
export default Menubar;