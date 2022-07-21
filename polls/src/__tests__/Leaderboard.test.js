import React from "react";
import { Provider } from "react-redux";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import User from "../components/User";

const mockStore = configureStore([]);

describe("Leaderboard", () => {
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

  it("Should render user profile", () => {
    render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <User />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Francisco Frias")).toBeInTheDocument();
  });
});
