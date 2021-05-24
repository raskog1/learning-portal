// TODO:  Find more attractive method to open Sidebar
// TODO:  Icon or logo?

import React, { useState } from "react";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Button, Collapse, Divider, Drawer, List } from "@material-ui/core";
import { ListItem, ListItemText } from "@material-ui/core";
import { DragHandle, ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    backgroundColor: "#fff9c4",
    color: "#455a64",
  },
  fullList: {
    width: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  sideways: {
    textOrientation: "sideways",
    transform: "rotate(90deg)",
    position: "fixed",
    top: "45%",
    left: "-20px",
    boxShadow: "none",
  },
}));

function Sidebar({ drop, logout, setView, toggleDrop, user }) {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  const changeView = (view) => {
    toggleDrop();
    setView(view);
  };

  return (
    <>
      <Button
        onClick={toggleDrop}
        className={classes.sideways}
        variant="contained"
        color="secondary"
      >
        <DragHandle />
      </Button>
      <Drawer
        open={drop.isOpen}
        classes={{ paper: classes.root }}
        onClose={toggleDrop}
        anchor="left"
      >
        <div role="presentation" className={classes.root}>
          <List>
            <ListItem key="User">
              <ListItemText primary={`${user.first}'s Learning Portal`} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => changeView("profile")}
              key="Profile"
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              onClick={() => changeView("community")}
              key="Community"
            >
              <ListItemText primary="Community" />
            </ListItem>
            <ListItem button onClick={handleClick} key="Assessments">
              <ListItemText primary="Assessments" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => changeView("HTML")}
                >
                  <ListItemText primary="HTML / CSS" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => changeView("JavaScript")}
                >
                  <ListItemText primary="JavaScript" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => changeView("NodeJS")}
                >
                  <ListItemText primary="NodeJS" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => changeView("React")}
                >
                  <ListItemText primary="React" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => changeView("scores")} key="Scores">
              <ListItemText primary="Scores" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={logout} key="Logout">
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
