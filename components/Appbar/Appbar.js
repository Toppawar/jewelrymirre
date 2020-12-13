import { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useRouter } from "next/router"


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';


import { routes, routeNames } from '../../constants/routes.js';


import { logOut } from '../../firebase/client';

import styles from './Appbar.style';

const useStyles = makeStyles(styles);


const CustomAppbar = ({
    user
}) => {

    const classes = useStyles();
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleRoute = useCallback(
        (value, _) => {
            router.replace(value)
        }, []
    );

    const handleLogout = useCallback(
        (event) => {
            event.preventDefault();
            logOut();
        }, []
    );

    const toggleDrawer = useCallback(
        () => {
            setDrawerOpen(prevState => !prevState);
        }, [setDrawerOpen]
    );

    return user && user.uid && router.pathname !== routes.LOGIN_ROUTE ? (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {routeNames[router.pathname]}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleDrawer}>
                        {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key="orders" onClick={handleRoute.bind(this, '/orders')}>
                        <ListItemIcon><MoveToInboxIcon /></ListItemIcon>
                        <ListItemText primary="Pedidos" />
                    </ListItem>
                    <ListItem button key="clients" onClick={handleRoute.bind(this, '/clients')}>
                        <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                    <ListItem button key="logout" onClick={handleLogout}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Salir" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
        : null;
}

export default CustomAppbar;