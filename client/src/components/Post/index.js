import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../utils/AuthContext";

// Components
import Comment from "../Comment";
import { Accordion, Button, Grid, Typography } from "@material-ui/core";
import {
  AccordionSummary,
  AccordionDetails,
  Divider,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  buffer: {
    margin: 10,
    fontSize: 40,
  },
  justify: {
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#fff9c4",
    margin: 4,
  },
  altButton: {
    float: "right",
  },
  transparent: {
    background: "rgba(255, 255, 255, .6)",

    // background: "rgba(255, 249, 196, .8)",
  },
  altTransparent: {
    justifyContent: "space-between",
    // background: "rgba(69, 90, 100, .5)",
    background: "rgba(255, 249, 196, .8)",
  },
}));

function Post({ post, setId, setOpen }) {
  const [expanded, setExpanded] = useState(true);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [helperText, setHelperText] = useState("");
  const [comments, setComments] = useState([]);

  const { auth } = useContext(AuthContext);

  const classes = useStyles();

  useEffect(() => {
    const sortComments = post.comments.reverse();
    setComments(sortComments);
  }, []);

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const author = `${auth.user.first.charAt(0).toLowerCase()}${
      auth.user.last
    }`;

    if (comment) {
      axios
        .put(`/api/posts/${post._id}`, { details: comment, author })
        .then((res) => {
          setHelperText("Comment successfully added.");
          setComment("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Accordion className={classes.transparent} expanded={expanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-content"
          onClick={() => setExpanded(!expanded)}
        >
          <Typography variant="h5">{post.title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.justify}>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={9}>
              <Grid direction="column" justify="space-between">
                <Typography gutterBottom>{post.content}</Typography>
                <Typography gutterBottom variant="caption">
                  {post.author} - {post.date}
                </Typography>
              </Grid>
            </Grid>

            <hr />
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <Button
                    className={classes.button}
                    onClick={() => {
                      setHelperText("");
                      setOpenComment(!openComment);
                    }}
                  >
                    <InsertCommentIcon
                      className={classes.buffer}
                      color="primary"
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    id={post._id}
                    disabled={auth.user._id !== post.user}
                    onClick={(e) => {
                      setId(e.target.id);
                      setOpen(true);
                    }}
                  >
                    <DeleteForeverIcon
                      className={classes.buffer}
                      color="primary"
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {openComment ? (
              <form className={classes.root} onSubmit={(e) => submitComment(e)}>
                <TextField
                  className={classes.root}
                  id="outlined-multiline-static"
                  label="Comment"
                  variant="outlined"
                  margin="normal"
                  name="comment"
                  value={comment}
                  onChange={onChange}
                />
                <FormHelperText color="secondary">{helperText}</FormHelperText>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.altButton}
                >
                  Submit Comment
                </Button>
              </form>
            ) : (
              <></>
            )}
          </Grid>
        </AccordionDetails>
        <AccordionDetails className={classes.altTransparent}>
          <Grid container direction="column">
            {comments.map((comment) => (
              <>
                <Comment comment={comment} />
                <Divider />
              </>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default Post;
