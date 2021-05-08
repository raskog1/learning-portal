import React from "react";
import { Grid } from "@material-ui/core";
import StaffCard from "../components/StaffCard";

function Staff() {
  const employees = [
    {
      name: "Amar Mann",
      position: "CEO",
      bio: "I am the CEO of this company!  All bow before me!",
      image: "../assets/images/25.jpg",
    },
    {
      name: "Todd Chavez",
      position: "Front End Engineer",
      bio: "lorem ipsum",
      image: "../assets/images/14.jpg",
    },
    {
      name: "Princess Caroline",
      position: "Back End Engineer",
      bio: "lorem ipsum",
      image: "../assets/images/9.jpg",
    },
    {
      name: "Bojack Horseman",
      position: "Intern",
      bio: "lorem ispum",
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
