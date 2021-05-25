import React, { useEffect, useState } from "react";
import axios from "axios";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Button, Container, Modal } from "@material-ui/core";
import Post from "../Post";

const useStyles = makeStyles((theme) => ({
  scroll: {
    height: "90vh",
    overflowX: "auto",
  },
  altButton: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "lightslategrey",
    border: "2px solid #000",
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Social() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const classes = useStyles();

  useEffect(() => {
    const getPosts = async () => {
      const selfPosts = await axios.get("/api/posts");
      setPosts(selfPosts.data);
    };
    getPosts();
  }, []);

  const deletePost = (e) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(setOpen(false))
      .then(() => {
        const filterPosts = posts.filter((post) => {
          return post._id !== id;
        });
        setPosts(filterPosts);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.scroll} maxWidth="md">
      {posts.map((post) => (
        <Post spacing={5} post={post} setOpen={setOpen} setId={setId} />
      ))}
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">
            Are you sure you want to delete this post?
          </h2>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              className={classes.altButton}
              onClick={() => setOpen(false)}
            >
              Cxl
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.altButton}
              onClick={(e) => deletePost(e)}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default Social;
