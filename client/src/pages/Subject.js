import React from "react";

// Components
import Navbar from "../components/Navbar";
import { Grid } from "@material-ui/core";
import SubCard from "../components/SubCard";

function Subject() {
  const subjects = [
    {
      name: "HTML/CSS",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/HTML5_Badge.svg/600px-HTML5_Badge.svg.png",
      description: "Create and style beautiful web experiences.",
      alt: "HTML Logo",
    },
    {
      name: "nodeJS",
      src: "../assets/images/nodejs.png",
      description: "All the tools of JavaScript, now in a backend environment.",
      alt: "nodeJS Logo",
    },
    {
      name: "JavaScript",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png",
      description:
        "Add functionality to your websites with this versatile language.",
      alt: "JavaScript Logo",
    },
    {
      name: "React",
      src: "https://sujanbyanjankar.com.np/wp-content/uploads/2019/01/React.js_logo-512.png",
      description:
        "Develop websites with a lot more horsepower under the hood.",
      alt: "React Logo",
    },
  ];

  return (
    <>
      <Navbar />
      <div
        style={{ flexGrow: 1, width: "550px", margin: "auto", marginTop: "5%" }}
      >
        <Grid container spacing={1}>
          {subjects.map((subject) => {
            return (
              <SubCard
                name={subject.name}
                src={subject.src}
                description={subject.description}
              />
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default Subject;
