import React from "react";

// Components
import { Container, Divider } from "@material-ui/core";

function Scores() {
  return (
    <Container maxWidth="md">
      <h1>Scores:</h1>
      <Divider />
      <h3>JavaScript: 86</h3>
      <h3>React: 70</h3>
      <h3>NodeJS: 98</h3>
      <h3>HTML/CSS: 80</h3>
      <Divider />
    </Container>
  );
}

export default Scores;
