import React from "react";

// Components
import { Link } from "react-router-dom";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Navbar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab component={Link} label="Login" to="/login" />
          <Tab component={Link} label="What We Do" to="/about" />
          <Tab component={Link} label="Available Subjects" to="/subject" />
          <Tab component={Link} label="Who We Are" to="/staff" />
        </Tabs>
      </Paper>
    </>
  );
}

export default Navbar;
