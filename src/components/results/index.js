import React from "react";

import "./results.scss";

export default function Results(props) {
  return (
    <>
        {props.data && (
        <pre className="response" data-testid="results">
          {JSON.stringify(props.data, null, "\t")}
        </pre>
      )}
    </>
  );
}