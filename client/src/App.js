// import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Utilities and Context
import { AuthProvider } from "./utils/AuthContext";
// import setAuthToken from "./utils/setAuthToken";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Private from "./routing/Private";

// Pages and Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Staff from "./pages/Staff";
import Subject from "./pages/Subject";
import Dashboard from "./pages/Dashboard";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#455a64",
    },
    secondary: {
      main: "#fff9c4",
    },
  },
});

function App() {
  // useEffect(() => {
  //   if (localStorage.auth.token) {
  //     setAuthToken(localStorage.auth.token);
  //   } else {
  //     setAuth({
  //       ...auth,
  //       isAuthenticated: false,
  //       loading: false,
  //     });
  //   }
  // });

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <Route path="/staff" component={Staff} />
          <Route path="/subject" component={Subject} />
          <Private exact path="/dashboard" component={Dashboard} />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
