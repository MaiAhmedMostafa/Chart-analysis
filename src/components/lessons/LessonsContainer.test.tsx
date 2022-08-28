import { render, screen } from "@testing-library/react";

import LessonsContainer from "./LessonsContainer";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { initialState } from "redux/lessons/lessonsReducer";
import { BrowserRouter } from "react-router-dom";
const mockStore = configureMockStore([]);

describe("App start", () => {
  it("Display loading screen if data is not loaded yet", () => {
    const store = mockStore({
      lessons: {
        isLoaded: false,
      },
    });
    const { queryByTestId } = render(
      <Provider store={store}>
        <LessonsContainer />
      </Provider>
    );

    expect(screen.getByTestId("loading")).toBeTruthy();
    expect(queryByTestId("dashboard")).toBeNull();
  });

  it("Display the dashboard after loading the data", async () => {
    const store = mockStore({
      lessons: {
        ...initialState,
        isLoaded: true,
      },
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LessonsContainer />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("dashboard")).toBeTruthy();
    expect(queryByTestId("loading")).toBeNull();
  });
});
