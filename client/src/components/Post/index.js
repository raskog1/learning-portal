import React from "react";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import Comment from "../Comment";
import { Accordion, Button, Grid, Typography } from "@material-ui/core";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
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
  transparent: {
    background: "rgba(255, 249, 196, .3)",
  },
}));

function Post({ post }) {
  const classes = useStyles();

  return (
    <Accordion className={classes.transparent}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-content"
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
                <Button className={classes.button}>
                  <InsertCommentIcon
                    className={classes.buffer}
                    color="primary"
                  />
                </Button>
              </Grid>
              <Grid item>
                <Button className={classes.button}>
                  <DeleteForeverIcon
                    className={classes.buffer}
                    color="primary"
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionDetails className={classes.justify}>
        <Grid container direction="column">
          {post.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default Post;
