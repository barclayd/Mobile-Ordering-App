import React from "react";
import Capture from "../Pics/Capture.PNG";

const Button1 = props => {
  return (
    <div>
      <button
        style={{
          width: "150px",
          height: "60px",
          borderRadius: "20px 20px 20px 20px",
          display: "inline-block"
        }}
      >
        {props.name}
        <img
          src={Capture}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "200px",
            marginLeft: "-50px"
          }}
        />{" "}
        {props.title}
        <br />
      </button>
    </div>
  );
};
export default Button1;
