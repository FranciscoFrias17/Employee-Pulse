import { render } from "@testing-library/react";
import React from "react";
import Error from "../components/Error";

describe("Error", () => {
  it("will match snapshot", () => {
    const { container } = render(<Error />);
    expect(container).toMatchSnapshot();
  });
});
