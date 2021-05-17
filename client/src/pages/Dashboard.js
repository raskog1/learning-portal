import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

// Utilities and Context
import { AuthContext } from "../utils/AuthContext";

// Components
import Sidebar from "../components/Sidebar";
import Assessment from "../components/Assessment";
import Profile from "../components/Profile";
import Scores from "../components/Scores";
import Social from "../components/Social";

function Dashboard() {
  const [drop, setDrop] = useState({
    isOpen: false,
  });
  const [view, setView] = useState("social");

  const getView = () => {
    switch (view) {
      case "profile":
        return <Profile />;
      case "scores":
        return <Scores />;
      case "assess":
        return <Assessment />;
      case "social":
        return <Social />;
      default:
        return <Social />;
    }
  };

  const history = useHistory();

  const { auth, setAuth } = useContext(AuthContext);

  const toggleDrop = () => {
    setDrop({ isOpen: !drop.isOpen });
  };

  const reroute = (text) => {
    history.pushState(`/${text.toLowerCase()}`);
  };

  const logout = () => {
    setAuth({ ...auth, isAuthenticated: false, token: null, user: null });
  };

  return (
    <>
      <Sidebar
        drop={drop}
        logout={logout}
        reroute={reroute}
        toggleDrop={toggleDrop}
        setView={setView}
        user={auth.user}
      />
      {getView()}
    </>
  );
}

export default Dashboard;

// Figure out how to keep track of what page is rendered at any time
