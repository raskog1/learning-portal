// TODO:  Failed prop type: Invalid prop `focused` of type `string` supplied to `ForwardRef(FormLabel)`, expected `boolean`.

import React, { useEffect, useState } from "react";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import { FormLabel, FormControlLabel, FormHelperText } from "@material-ui/core";
import { Divider, Radio, RadioGroup } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  divider: {
    margin: "20px 0",
  },
}));

function Question({ handleRadioChange, id, question, submitted, value }) {
  const [helper, setHelper] = useState("");

  const checkAnswer = () => {
    if (submitted && question.correctA !== value[id]) {
      setHelper("Incorrect answer.");
    }
  };

  useEffect(() => {
    checkAnswer();
  }, [submitted]);

  const classes = useStyles();

  return (
    <>
      <FormLabel component="legend" focused="false" color="secondary">
        {question.q}
      </FormLabel>
      <RadioGroup
        id={id}
        aria-label={id}
        name={id}
        value={value.id}
        onChange={handleRadioChange}
      >
        {question.answers.map((answer) => (
          <FormControlLabel
            value={answer}
            control={<Radio />}
            label={answer}
            key={answer}
            disabled={submitted}
          />
        ))}
      </RadioGroup>
      <FormHelperText color="secondary">{helper}</FormHelperText>
      <Divider className={classes.divider} />
    </>
  );
}

export default Question;
