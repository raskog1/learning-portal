import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "./style.css";

function SubCard({ alt, description, name, src }) {
  return (
    <Grid item xs={12} sm={3} md={6} className="wrap">
      <Link to="/login">
        <div className="tile">
          <img src={src} alt={alt} />
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
      </Link>
    </Grid>
  );
}

export default SubCard;
