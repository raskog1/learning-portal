import React, { useEffect } from "react";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buffer: {
    margin: 10,
  },
  justify: {
    justifyContent: "space-between",
  },
  caption: {
    float: "right",
    marginRight: 20,
    marginTop: 5,
  },
  transparent: {
    background: "rgba(255, 249, 196, .3)",
  },
}));

function Comment({ comment }) {
  const classes = useStyles();

  const newDate = new Date(comment.date);

  return (
    <Grid container direction="row" justify="space-between">
      <Grid item xs={4}>
        <Typography gutterBottom className={classes.caption} variant="caption">
          {comment.author} - {newDate.toLocaleString("en-US")}:
        </Typography>
      </Grid>

      <Grid item xs={8}>
        <Typography style={{ marginTop: 5 }} gutterBottom>
          {comment.details}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Comment;
