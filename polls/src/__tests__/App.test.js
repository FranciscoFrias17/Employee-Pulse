import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";
import { Provider } from "react-redux";
import store from "../utils/test-util";

describe("App", () => {
  it("On load should render login component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Employee Polls")).toBeInTheDocument();
    expect(screen.getByText("Please select a user:")).toBeInTheDocument();
  });

  it("Login button should be disabled until user is selected", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Log in")).toBeDisabled();
  });
});
