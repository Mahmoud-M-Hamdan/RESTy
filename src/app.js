import React, { useState } from "react";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

export default function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = async (requestParams) => {
  
    await fetch(requestParams.url, {
      method: requestParams.method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: requestParams.body ? JSON.stringify(requestParams.body) : null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });

    setRequestParams(requestParams);
  };

  return (
    <>
      <Header />
      <Form handleApiCall={callApi} />
      <div className="requestInfo">
        <p>Request Method: {requestParams.method}</p>
        <p>URL: {requestParams.url}</p>
      </div>
      <Results data={data} />
      <Footer />
    </>
  );
}