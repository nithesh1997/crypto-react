import React from "react";
import { Link } from "react-router-dom";

function HoverBoxHeading(props) {
  return (
    <div className="box_hover_main d-flex justify-content-center align-items-center flex-column gap-3">
      {props.data.map((a) => {
        return (
          <div className="single_box_hover_list d-flex justify-content-center  flex-column gap-2">
            <div className="heading_in_hover_box">{a.heading}</div>
            <div className="d-flex  hover_con flex-column">
              {a.list.map((b) => (
                <div>
                  <Link
                    className="remove_dec link_text_color_in_hover_box"
                    to={b.link}
                  >
                    {b.lable}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HoverBoxHeading;
