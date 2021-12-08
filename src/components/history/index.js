import React from "react";

import "./history.scss";

export default function History(props) {
  return (
    <>
      <div id="container">
        <h2>Request History</h2>
        {props.history.map((item) => {
          return (
            <div
              className="sub-container"
              onClick={() => props.updateData(item.response)}
            >
              <span id={item.method}>{item.method} </span>
              <span>➡️ {item.url}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}