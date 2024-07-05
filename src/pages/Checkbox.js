import React, { forwardRef, useImperativeHandle } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Checkbox = (props) => {
  const { onMethodChange } = props;

  return (
    <Form.Group style={{ fontSize: "14px" }}>
      {["checkbox"].map((type) => (
        <div key={`inline-${type}`}>
          <Form.Check
            inline
            label="15 Sec"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            value="15 Sec"
            onChange={onMethodChange}
          />
          <Form.Check
            inline
            label="30 Sec"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            value="30 Sec"
            onChange={onMethodChange}
          />
          <Form.Check
            inline
            label="1 min"
            type={type}
            id={`inline-${type}-3`}
            value="1 min"
            onChange={onMethodChange}
          />
          <Form.Check
            inline
            label="5 min"
            type={type}
            id={`inline-${type}-4`}
            value="5 min"
            onChange={onMethodChange}
          />
          <Form.Check
            inline
            label="1 hour"
            type={type}
            id={`inline-${type}-5`}
            value="1 hour"
            onChange={onMethodChange}
          />
        </div>
      ))}
    </Form.Group>
  );
};
export default Checkbox;
