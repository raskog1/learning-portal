import React from "react";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Container } from "@material-ui/core";
import Post from "../Post";

// Data
import posts from "../../data/posts.json";

const useStyles = makeStyles((theme) => ({
  scroll: {
    height: "90vh",
    overflowX: "auto",
  },
}));

function Social() {
  const classes = useStyles();

  return (
    <Container className={classes.scroll} maxWidth="md">
      {posts.map((post) => (
        <Post spacing={5} post={post} />
      ))}
    </Container>
  );
}

export default Social;
