import React from "react";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import Navbar from "../components/Navbar";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    color: "darkslategray",
  },
  head: {
    fontSize: "3.5em",
    marginBottom: 0,
  },
  related: {
    letterSpacing: ".18em",
    marginTop: 2,
  },
  para: {
    margin: "auto",
    width: "70%",
    color: "lightyellow",
    lineHeight: 2,
    fontSize: 18,
    letterSpacing: ".05em",
  },
});

function About() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <h1 className={classes.head}>Assess JS</h1>
        <h5 className={classes.related}>
          Evaluate | Analyze | Appraise | Demonstrate | Distinguish
        </h5>
        <p className={classes.para}>
          Assess JS isn't just a testing site. It's a learning site. With each
          assessment comes a wealth of experience and knowledge. Low test scores
          should not be shunned, but should be evaluated for the knowledge that
          was extracted from the questions and the challenge as a whole. Do not
          fear the letters and numbers that attempt to make up a valuation of
          your worth. Embrace the experience, and levitate these building blocks
          into something phenomenal!
        </p>
      </div>
    </>
  );
}

export default About;
