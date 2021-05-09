import React from "react";
import { Grid } from "@material-ui/core";
import StaffCard from "../components/StaffCard";

function Staff() {
  const employees = [
    {
      name: "Amar Mann",
      position: "CEO",
      bio: "I am the CEO of this company!  All bow before me!",
      image: "../assets/images/amar.jpg",
    },
    {
      name: "Todd Chavez",
      position: "Front End Engineer",
      bio:
        "Spicing things up on the front end with power combo of HTML, CSS, and React.",
      image: "../assets/images/14.jpg",
    },
    {
      name: "Princess Caroline",
      position: "Back End Engineer",
      bio:
        "Reliable as ever, no difference if it's a SQL database or a noSQL database, I'll get your data.",
      image: "../assets/images/9.jpg",
    },
    {
      name: "Bojack Horseman",
      position: "Intern",
      bio:
        "It gets easier every day.  That's the hard part, you gotta do it every day.  But it does get easier.",
      image: "../assets/images/7.jpg",
    },
  ];

  return (
    <div style={{ flexGrow: 1, width: "75%", margin: "auto", marginTop: "5%" }}>
      <Grid container spacing={1}>
        {employees.map((employee) => {
          return <StaffCard employee={employee} />;
        })}
      </Grid>
    </div>
  );
}

export default Staff;
