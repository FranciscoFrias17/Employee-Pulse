import React from "react";
import { Provider } from "react-redux";
import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import NewQuestion from "../components/NewQuestion";

const mockStore = configureStore([]);

describe("NewQuestion", () => {
  let mockedStore;

  beforeEach(() => {
    mockedStore = mockStore({
      users: {
        franciscofrias: {
          id: "franciscofrias",
          password: "123456",
          name: "Francisco Frias",
          avatarURL:
            "https://static.vecteezy.com/system/resources/previews/004/477/337/non_2x/face-young-man-in-frame-circular-avatar-character-icon-free-vector.jpg",
          answers: {},
          questions: [],
        },
      },
      authedUser: "franciscofrias",
    });
  });

  it("should render NewQuestion component", () => {
    render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Create New Question")).toBeInTheDocument();
  });

  it("should have a disabled submit button until the form is filled out", () => {
    render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );

    const optionOne = screen.getByTestId("optionOneText");
    const optionTwo = screen.getByTestId("optionTwoText");
    expect(screen.getByTestId("submit-button")).toBeDisabled();

    fireEvent.change(optionOne, { target: { value: "Option One" } });
    fireEvent.change(optionTwo, { target: { value: "Option Two" } });
    expect(screen.getByTestId("submit-button")).not.toBeDisabled();
  });
});
