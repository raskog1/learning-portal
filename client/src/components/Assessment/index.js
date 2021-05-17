import React, { useState } from "react";

// Utilities and Context
import { makeStyles } from "@material-ui/core/styles";

// Components
import { Button, Container, Divider } from "@material-ui/core";
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import { Radio, RadioGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "40px 0 0 20px",
    height: "80vh",
    overflowX: "auto",
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  divider: {
    margin: "20px 0",
  },
}));

function Assessment() {
  const classes = useStyles();

  const [value, setValue] = useState({});
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleRadioChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHelperText(
      "Thank you for your submission. You assessment will be graded within 24 hours."
    );
    setError(true);
  };

  return (
    <Container maxWidth="md">
      <form className={classes.formControl} onSubmit={(e) => handleSubmit(e)}>
        <FormControl component="fieldset" error={error} fullWidth>
          <FormLabel component="legend" focused="false" color="secondary">
            JavaScript is a single threaded programming language?
          </FormLabel>
          <RadioGroup
            aria-label="q1"
            name="q1"
            value={value.q1}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            Boolean data types represent values stored in a linked list.
          </FormLabel>
          <RadioGroup
            aria-label="q2"
            name="q2"
            value={value.q2}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            JavaScript is based off of the Java coding language.
          </FormLabel>
          <RadioGroup
            aria-label="q3"
            name="q3"
            value={value.q3}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            JavaScript can only be used for front end web applications.
          </FormLabel>
          <RadioGroup
            aria-label="q4"
            name="q4"
            value={value.q4}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            Object data types hold key/value pairs of associated data.
          </FormLabel>
          <RadioGroup
            aria-label="q5"
            name="q5"
            value={value.q5}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            A 'for' loop and a 'forEach' loop are essentially the same thing.
          </FormLabel>
          <RadioGroup
            aria-label="q6"
            name="q6"
            value={value.q6}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            jQueezy is a JavaScript library.
          </FormLabel>
          <RadioGroup
            aria-label="q7"
            name="q7"
            value={value.q7}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            In JavaScript, we use '===' to assign values
          </FormLabel>
          <RadioGroup
            aria-label="q8"
            name="q8"
            value={value.q8}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            JavaScript will never ask for your password.
          </FormLabel>
          <RadioGroup
            aria-label="q9"
            name="q9"
            value={value.q9}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />

          <FormLabel component="legend" focused="false" color="secondary">
            All websites include at least some JavaScript functionality.
          </FormLabel>
          <RadioGroup
            aria-label="q10"
            name="q10"
            value={value.q10}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
          <Divider className={classes.divider} />
        </FormControl>
        <FormHelperText color="secondary">{helperText}</FormHelperText>
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          className={classes.button}
        >
          Check Answers
        </Button>
      </form>
    </Container>
  );
}

export default Assessment;
