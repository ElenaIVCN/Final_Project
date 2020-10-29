import React, { useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import KitchenIcon from '@material-ui/icons/Kitchen';
import { TheContext } from '../features/TheContext';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
}));

export default function Sidebar({ handleDrawerToggle, mobileOpen, links }) {
    const classes = useStyles();
    const theme = useTheme();
    const { setCategoryString } = useContext(TheContext);

    const handleCategories = (categoryName) => {
        setCategoryString(categoryName);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem
                    to={handleCategories}
                    button
                    key={-1}
                    onClick={handleCategories.bind(this, 'All')}
                >
                    <ListItemIcon>
                        <KitchenIcon />
                    </ListItemIcon>
                    <ListItemText primary={'All'} />
                </ListItem>
                {links.map((link) => (
                    <ListItem
                        to={handleCategories}
                        button
                        key={link.id}
                        onClick={handleCategories.bind(this, link.name)}
                    >
                        <ListItemIcon>
                            <KitchenIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                link.name.charAt(0).toUpperCase() +
                                link.name.slice(1)
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={window.document.body}
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
            <Hidden xsDown implementation="css">
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
    );
}
