import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Checkbox from "./Checkbox";

const Box = () => {
  return (
    <Card style={{ margin: "0.2rem" }}>
      <Card.Body>
        <Card.Text>
          <Checkbox />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Box;
