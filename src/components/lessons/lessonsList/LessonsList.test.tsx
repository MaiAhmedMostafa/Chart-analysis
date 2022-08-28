import { render, screen } from "@testing-library/react";
import LessonsList from "./LessonsList";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { initialState } from "redux/lessons/lessonsReducer";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureMockStore([]);

describe("App start", () => {
  it("Fill dropDownValues after fetching the data", async () => {
    const store = mockStore({
      lessons: {
        ...initialState,
        items: {
          "620af3a436ef2b07ee9f5fa3": {
            id: "620af3a436ef2b07ee9f5fa3",
            month: "Mar",
            camp: "Omaka",
            country: "Kenya",
            school: "Burke High School",
            lessons: 200,
          },
          "620af3a41cbec700f392ae14": {
            id: "620af3a41cbec700f392ae14",
            month: "Oct",
            camp: "Omaka",
            country: "Tunisia",
            school: "Te Kupenga Preschool",
            lessons: 105,
          },
          "620af3a48f122bac7d7ec3a9": {
            id: "620af3a48f122bac7d7ec3a9",
            month: "Jul",
            camp: "Kakuma",
            country: "Tanzania",
            school: "Greenlight",
            lessons: 10,
          },
        },
        countryFilteredValue: "Tanzania",
        campFilteredValue: "Kakuma",
        schoolFilteredValue: { Greenlight: true },
      },
    });

    const { queryAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LessonsList />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId("count_totalNoOfLessons")).toHaveTextContent(
      "10"
    );
    expect(screen.getByTestId("camp_totalNoOfLessons")).toHaveTextContent(
      "Kakuma"
    );

    //test no. of sections in lessons list
    expect(queryAllByTestId("lessonsList")).toHaveLength(1);
  });
});
