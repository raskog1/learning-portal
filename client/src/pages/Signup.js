import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// Utilities and Context
import { AuthContext } from "../utils/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

// Components
import Navbar from "../components/Navbar";
import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signup() {
  const [credentials, setCredentials] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  const { first, last, email, password } = credentials;
  const { auth, setAuth } = useContext(AuthContext);
  const classes = useStyles();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const body = JSON.stringify({ first, last, email, password });
      const res = await axios.post("/api/users", body, config);

      // Set headers for future API calls
      axios.defaults.headers.common["x-auth-token"] = res.data.user.token;

      setAuth({
        ...auth,
        isAuthenticated: true,
        loading: false,
        token: res.data.user.token,
        user: res.data.user,
      });
    } catch (error) {
      setAuth({ ...auth, isAuthenticated: false, token: null });
      console.error(error);
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => onSubmit(e)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  autoComplete="fname"
                  name="first"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last"
                  autoComplete="lname"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => onChange(e)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link color="secondary" href="/" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Signup;
