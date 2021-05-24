import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../utils/AuthContext";

// Components
import Post from "../Post";
import { Container, Divider, Modal, Typography } from "@material-ui/core";
import {
  Accordion,
  Button,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
  },
  pad: {
    paddingLeft: 10,
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
    display: "block",
  },
  altButton: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  transparent: {
    background: "rgba(255, 255, 255, .3)",
  },
  scroll: {
    height: "90vh",
    overflowX: "auto",
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

function Profile() {
  const [newExpand, setNewExpand] = useState(false);
  const [oldExpand, setOldExpand] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
  });
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const { auth } = useContext(AuthContext);

  const classes = useStyles();

  useEffect(() => {
    const getPosts = async () => {
      const selfPosts = await axios.get("/api/posts/self");
      setPosts(selfPosts.data);
    };
    getPosts();
  }, []);

  const onChange = (e) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
  };

  const submitPost = (e) => {
    e.preventDefault();
    const author = `${auth.user.first.charAt(0).toLowerCase()}${
      auth.user.last
    }`;
    const { title, content } = postDetails;
    if (title && content) {
      axios
        .post("/api/posts", { title, content, author })
        .then((res) => {
          setHelperText("Post successfully added.");
          setTimeout(() => {
            setHelperText("");
            axios
              .get("/api/posts/self")
              .then((res) => setPosts(res.data))
              .catch((err) => console.log(err));
          }, 1000);
          setPostDetails({ title: "", content: "" });
        })
        .catch((err) => console.log(err));
    }
  };

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
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Divider gutterBottom />
      <Accordion className={classes.transparent} expanded={newExpand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-content"
          onClick={() => setNewExpand(!newExpand)}
        >
          <Typography variant="h5">Create a Post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form
            className={classes.pad}
            noValidate
            autoComplete="off"
            onSubmit={(e) => submitPost(e)}
          >
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              margin="normal"
              name="title"
              value={postDetails.title}
              onChange={(e) => onChange(e)}
            />
            <TextField
              className={classes.root}
              id="outlined-multiline-static"
              label="Content"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              name="content"
              value={postDetails.content}
              onChange={(e) => onChange(e)}
            />
            <FormHelperText color="secondary">{helperText}</FormHelperText>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={!postDetails.title || !postDetails.content}
            >
              Submit Post
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.transparent} expanded={oldExpand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-content"
          onClick={() => setOldExpand(!oldExpand)}
        >
          <Typography variant="h5">Your Posts</Typography>
        </AccordionSummary>
        {posts.map((post) => (
          <Post spacing={5} post={post} setOpen={setOpen} setId={setId} />
        ))}
      </Accordion>

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

export default Profile;
