import LessonsForm from "./LessonForm";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import enStrings from "./locale/lessonsForm.en.json";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureMockStore([]);

describe("Lesson form", () => {
  test("no selected data to be rendered", () => {
    const store = mockStore({
      lessons: {
        selectedId: "",
      },
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LessonsForm />
        </BrowserRouter>
      </Provider>
    );
    expect(queryByTestId("lessonFormContainer")).toBeNull();
  });

  test("renders lesson's data", () => {
    const fakeLesson = {
      id: "620af3a4b8c8ca0afd385a9c",
      month: "Apr",
      camp: "Kakuma",
      country: "Egypt",
      school: "Kakuma Secondary",
      lessons: 170,
    };
    const store = mockStore({
      lessons: {
        items: {
          "620af3a4b8c8ca0afd385a9c": fakeLesson,
        },
        selectedId: "620af3a4b8c8ca0afd385a9c",
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LessonsForm />
        </BrowserRouter>
      </Provider>
    );

    //camp section
    expect(screen.getByTestId(enStrings.campLabel)).toHaveTextContent(
      enStrings.campLabel
    );
    expect(
      screen.getByTestId(`${enStrings.campLabel}_value`)
    ).toHaveTextContent(fakeLesson.camp);

    //School section
    expect(screen.getByTestId(enStrings.schoolLabel)).toHaveTextContent(
      enStrings.schoolLabel
    );
    expect(
      screen.getByTestId(`${enStrings.schoolLabel}_value`)
    ).toHaveTextContent(fakeLesson.school);

    //Country section
    expect(screen.getByTestId(enStrings.countryLabel)).toHaveTextContent(
      enStrings.countryLabel
    );
    expect(
      screen.getByTestId(`${enStrings.countryLabel}_value`)
    ).toHaveTextContent(fakeLesson.country);
  });
});
