import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Staff from "./pages/Staff";
import Subject from "./pages/Subject";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
  return (
    <Router>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={About} />
        <Route path="/staff" component={Staff} />
        <Route path="/subject" component={Subject} />
      </ThemeProvider>
    </Router>
  );
}

export default App;
