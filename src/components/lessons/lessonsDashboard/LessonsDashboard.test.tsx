import { render } from "@testing-library/react";
import LessonsDashboard from "./LessonsDashboard";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { initialState } from "redux/lessons/lessonsReducer";
import { BrowserRouter } from "react-router-dom";

import enStrings from "./locale/lessonsDashboard.en.json";

const mockStore = configureMockStore([]);

describe("App start", () => {
  it("Display the dropDownLists single value", () => {
    const store = mockStore({
      lessons: {
        ...initialState,
        countryFilteredValue: "selectedCountry",
        campFilteredValue: "selectedCamp",
        schoolFilteredValue: { selectedSchool: true },
      },
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LessonsDashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(queryByTestId("countryDDL")).toHaveTextContent("selectedCountry");
    expect(queryByTestId("campDDL")).toHaveTextContent("selectedCamp");
    expect(queryByTestId("schoolDDL")).toHaveTextContent("selectedSchool");
  });

  it("Display the school dropDownList with select all", () => {
    const store = mockStore({
      lessons: {
        ...initialState,
        schoolFilteredValue: { selectedSchool: true, selectedSchool2: true },
      },
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LessonsDashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(queryByTestId("schoolDDL")).toHaveTextContent(enStrings.selectAll);
  });
});
