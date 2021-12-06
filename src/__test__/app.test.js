import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../app";

test("If it takes the request url", async () => {
  render(<App />);

  const url = screen.getByTestId("url");

  expect(url).toHaveValue("https://pokeapi.co/api/v2/pokemon");
});