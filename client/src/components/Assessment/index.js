// TODO:  Make alert color red on incomplete submission
// TODO:  Lock answers after a successful submission, or clear questions completely
// TODO:  Add alert to each question indicating correct/incorrect answer
// TODO:  If score is already logged for this assessment, display a dif. message

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../utils/AuthContext";

// Components
import Question from "../Question";
import { Button, Container, Typography } from "@material-ui/core";
import { FormControl, FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "40px 0 0 20px",
    height: "80vh",
    overflowX: "auto",
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  topGutter: {
    paddingTop: 50,
  },
}));

function Assessment({ complete, test }) {
  const classes = useStyles();

  const [value, setValue] = useState({});
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const getAssess = async () => {
      const assessment = await axios.get(`/api/assess/${test}`);
      if (!assessment.data) {
        return setQuestions([]);
      }
      setQuestions(assessment.data.questions);
    };
    getAssess();
    setSubmitted(false);
    setValue({});
    setHelperText("");
  }, [test]);

  const handleRadioChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(value).length < questions.length) {
      setHelperText("Please answer all questions before submitting.");
      setError(true);
      return;
    }

    if (Object.keys(value).length >= questions.length) {
      let score = 100;

      for (let i = 0; i < questions.length; i++) {
        if (questions[i].correctA !== value[`q${i}`]) {
          score -= Math.floor(100 / questions.length);
        }
      }
      setHelperText(
        `You scored ${score} out of a possible 100 points.  Your score is being saved to your profile.`
      );

      const body = { test, score };

      axios.put("/api/users", body).then((data) => {
        setSubmitted(true);
        setError(true);
      });

      // axios.get("/api/users").then((data) => {
      //   setAuth({ ...auth, user: data.data });
      // });
    }
  };

  return complete ? (
    <Container maxWidth="md">
      <Typography
        className={classes.topGutter}
        variant="h4"
        color="primary"
        gutterBottom
      >
        You have already completed this assessment.
      </Typography>
    </Container>
  ) : (
    <Container maxWidth="md">
      {questions.length < 1 ? (
        <Typography
          variant="h4"
          className={classes.topGutter}
          color="primary"
          gutterBottom
        >
          No assessment for this subject yet. Stay posted.
        </Typography>
      ) : (
        <form className={classes.formControl} onSubmit={(e) => handleSubmit(e)}>
          <FormControl component="fieldset" error={error} fullWidth>
            {questions.map((question, index) => (
              <Question
                key={index}
                id={`q${index}`}
                question={question}
                handleRadioChange={handleRadioChange}
                value={value}
                submitted={submitted}
              />
            ))}
          </FormControl>
          <FormHelperText color="secondary">{helperText}</FormHelperText>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={submitted}
          >
            Submit Answers
          </Button>
        </form>
      )}
    </Container>
  );
}

export default Assessment;
