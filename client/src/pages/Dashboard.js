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
  const [view, setView] = useState("community");

  const getView = () => {
    const findTest = auth.user.scores.find((test) => test.name === view);

    if (findTest) {
      return <Assessment test={view} complete={true} />;
    }

    switch (view) {
      case "profile":
        return <Profile />;
      case "scores":
        return <Scores />;
      case "assess":
        return <Assessment />;
      case "community":
        return <Social />;
      default:
        return <Assessment test={view} complete={false} />;
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
