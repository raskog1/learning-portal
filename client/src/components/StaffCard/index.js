import React from "react";
import { Grid } from "@material-ui/core";
import "./style.css";

function StaffCard({ employee }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <aside className="profile-card">
        <header>
          <a>
            <img src={employee.image} alt="Random employee" />
          </a>
          <h1>{employee.name}</h1>
          <h2>- {employee.position} -</h2>
        </header>

        <div className="profile-bio">
          <p>{employee.bio}</p>
        </div>
      </aside>
    </Grid>
  );
}

export default StaffCard;
