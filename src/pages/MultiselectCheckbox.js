import React, { useEffect, useRef, useState } from "react";

const MultiselectCheckbox = ({ options, onChange }) => {
  const [data, setData] = React.useState(options);

  const toggle = (index) => {
    const newData = [...data];
    newData.splice(index, 1, {
      label: data[index].label,
      value: data[index].value,
      checked: !data[index].checked,
    });
    setData(newData);
    onChange(newData.filter((x) => x.checked));
  };

  return (
    <>
      {data.map((item, index) => (
        <label key={item.label}>
          <input
            readOnly
            type="checkbox"
            value={item.value || 0}
            checked={item.checked || false}
            onClick={() => toggle(index)}
          />
          <span style={{ color: item.lColor, fontWeight: "bold", fontSize: "12px" }}> {item.label} </span>&nbsp;
        </label>
      ))}
    </>
  );
};

export default MultiselectCheckbox;
