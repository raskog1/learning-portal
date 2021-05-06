import React from "react";
import { Grid } from "@material-ui/core";
import "./style.css";

function SubCard({ description, name, src }) {
  return (
    <Grid item xs={12} sm={3} md={6} className="wrap">
      <div className="tile">
        <img src={src} />
        <div className="text">
          {/* <h1>{name}</h1> */}
          <p className="animate-text">{description} </p>
          <h3 className="animate-text">Take the {name} assessment here</h3>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default SubCard;
