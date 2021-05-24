import React, { useEffect, useState } from "react";
import axios from "axios";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Container } from "@material-ui/core";
import Post from "../Post";

const useStyles = makeStyles((theme) => ({
  scroll: {
    height: "90vh",
    overflowX: "auto",
  },
}));

function Social() {
  const [posts, setPosts] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const getPosts = async () => {
      const selfPosts = await axios.get("/api/posts");
      setPosts(selfPosts.data);
    };
    getPosts();
  }, []);

  return (
    <Container className={classes.scroll} maxWidth="md">
      {posts.map((post) => (
        <Post spacing={5} post={post} key={post._id} />
      ))}
    </Container>
  );
}

export default Social;
