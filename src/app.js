import React, { useState, useEffect, useReducer } from "react";

import "./app.scss";


import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import History from "./components/history/index";


const initialState = {
  data: null,
  requestParams: {},
  loading: false,
  history: [],
};

function stateReducer(state = initialState, action) {
  switch (action.type) {
    case "data":
      return { ...state, data: action.payload };

    case "requestParams":
      return { ...state, requestParams: action.payload };

    case "loading":
      return { ...state, loading: action.payload };

    case "history":
      return { ...state, history: [...state.history, action.payload] };

    default:
      return state;
  }
}


export default function App() {
  const [appState, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    console.log("RequestParams Updated 😎");
    console.log(appState.requestParams);
  }, [appState.requestParams]);

  const callApi = async (requestParams) => {
    dispatch({
      type: "data",
      payload: null,
    });

    dispatch({
      type: "loading",
      payload: true,
    });

    if (requestParams.method === "GET" || requestParams.method === "DELETE") {
      requestParams.data = null;
    }

    let currentResponse;

    await fetch(requestParams.url, {
      method: requestParams.method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: requestParams.data ? JSON.stringify(requestParams.data) : null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        currentResponse = data;
        dispatch({
          type: "data",
          payload: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });


    dispatch({
      type: "loading",
      payload: false,
    });

    dispatch({
      type: "requestParams",
      payload: requestParams,
    });

    dispatch({
      type: "history",
      payload: {
        method: requestParams.method,
        url: requestParams.url,
        response: currentResponse,
      },
    });
  };

  const updateData = (data) => {
    console.log("in update data function");
    console.log(data);
    dispatch({
      type: "data",
      payload: data,
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div
       className="boody"
        >
          <Form handleApiCall={callApi} />
          <Results data={appState.data} />
        </div>

        <div 
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "20px",
          }}
        >
          <History history={appState.history} updateData={updateData} />
          <div className="requestInfo">
            <h2
              style={{ borderBottom: "3px solid white", paddingBottom: "5px" }}
            >
              Current Request
            </h2>
          </div>
        </div>
      </div>

      {appState.loading && <text className="loading">Loading ...</text>}

      <Footer />
    </>
  );
}


