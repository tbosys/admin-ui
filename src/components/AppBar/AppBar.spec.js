import React from "react";
import { mount } from "enzyme";
import { AppBar } from "./index";

describe("AppBar", () => {
  it("renders", () => {
    mount(<AppBar />);
  });
});
