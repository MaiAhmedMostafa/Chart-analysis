import { render, screen } from "@testing-library/react";
import DropDownList from "./DropDownList";

describe("DropDownList common component", () => {
  it("Check dropDownList Selected value", () => {
    const data = ["first", "second"];
    render(
      <DropDownList
        testId={"campDDLForTesting"}
        data={data}
        onselect={() => {}}
        value={"first"}
      />
    );

    expect(screen.getAllByText("first")).toBeTruthy();
  });
});
