import React from "react";
import { Link } from "react-router-dom";

function LinkList(props) {
  const lis = props.data;
  return (
    <div>
      {" "}
      <div className=" box_hover_main linklist_hover d-flex justify-content-center  flex-column gap-3 ">
        {lis.map((b) => (
          <div>
            <Link
              className="remove_dec link_text_color_in_hover_box  hover_con"
              to={b.link}
            >
              {b.lable}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkList;
