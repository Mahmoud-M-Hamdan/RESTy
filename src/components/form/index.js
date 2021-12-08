import React, { useState, useReducer } from "react";

import "./form.scss";

// **************************************************

const initialState = {
  method: "",
  url: "",
  body: null,
};

function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "method":
      return methodHandle(state, action.payload);

    case "url":
      return { ...state, url: action.payload };

    case "body":
      return { ...state, body: action.payload };

    default:
      return state;
  }
}

const methodHandle = (state, payload) => {
  // console.log("in methodHAndle function");
  return {
    ...state,
    method: payload,
  };
};

// **************************************************

export default function Form(props) {
  const [requestState, dispatch] = useReducer(stateReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      method: requestState.method,
      url: requestState.url,
      data: requestState.body ? JSON.parse(requestState.body) : null,
    };
    props.handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="url-label">
          <input
            name="url"
            type="text"
            placeholder="ENTER URL"
            data-testid="url"
            onChange={(e) =>
              dispatch({
                type: "url",
                payload: e.target.value,
              })
            }
          />
        </label>
        <textarea
          placeholder="Write Here my Dear 😍😁"
          onChange={(e) =>
            dispatch({
              type: "body",
              payload: e.target.value,
            })
          }
        ></textarea>
        <div className="methods">
          <span
            id={requestState.method === "GET" ? "clicked-button" : "get"}
            onClick={() => {
              dispatch({
                type: "method",
                payload: "GET",
              });
            }}
          >
            GET 😀
          </span>
          <span
            id={requestState.method === "POST" ? "clicked-button" : "post"}
            onClick={() => {
              dispatch({
                type: "method",
                payload: "POST",
              });
            }}
          >
            POST 😁
          </span>
          <span
            id={requestState.method === "PUT" ? "clicked-button" : "put"}
            onClick={() => {
              dispatch({
                type: "method",
                payload: "PUT",
              });
            }}
          >
            PUT 🤩
          </span>
          <span
            id={requestState.method === "DELETE" ? "clicked-button" : "delete"}
            onClick={() => {
              dispatch({
                type: "method",
                payload: "DELETE",
              });
            }}
          >
            DELETE 😐
          </span>
          <button type="submit" data-testid="submit">
            GO 🏃 😎
          </button>
        </div>
      </form>
    </>
  );
}