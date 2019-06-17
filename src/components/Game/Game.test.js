import React from "react";
import renderer from "react-test-renderer";

import Game from "./Game";

describe("Game", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Game />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
