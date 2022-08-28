import { render } from "@testing-library/react";

import App from "./App";
import enStrings from "./i18n/general.common.en.json";

describe("App start", () => {
  it("loads and displays no incident message", () => {
    render(<App />);

    expect(document.title).toBe(enStrings.headerTitle);
  });
});
