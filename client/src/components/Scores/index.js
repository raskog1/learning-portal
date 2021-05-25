import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Utilities and Context
import { AuthContext } from "../../utils/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Button, Container, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pad: {
    paddingTop: 20,
    paddingBottom: 20,
    display: "inline",
  },
  button: {
    display: "inline",
    float: "right",
  },
  root: {
    padding: 24,
  },
}));

function Scores() {
  const [user, setUser] = useState({});
  const { auth } = useContext(AuthContext);

  const classes = useStyles();

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await axios.get("/api/users");
      setUser(currentUser.data);
    };
    getUser();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" color="secondary" gutterBottom>
        Scores:
      </Typography>
      <Divider />
      {user.scores &&
        user.scores.map((test) => (
          <Container className={classes.root} key={test.name}>
            <Typography className={classes.pad} color="primary" variant="h5">
              {test.name}: {test.score}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              className={classes.button}
              // onClick={(e) => deletePost(e)}
            >
              Generate Certificate
            </Button>
          </Container>
        ))}
      <Divider />
    </Container>
  );
}

export default Scores;
