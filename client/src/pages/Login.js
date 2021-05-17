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
  Checkbox,
  CssBaseline,
  FormControlLabel,
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;
  const { auth, setAuth } = useContext(AuthContext);
  const classes = useStyles();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const body = JSON.stringify({ email, password });
      const res = await axios.post("/api/auth", body, config);

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
      <Container
        component="main"
        maxWidth="xs"
        style={{ boxSizing: "border-box" }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => onSubmit(e)}
          >
            <TextField
              color="secondary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => onChange(e)}
            />
            <TextField
              color="secondary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link color="secondary" href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link color="secondary" href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Login;
