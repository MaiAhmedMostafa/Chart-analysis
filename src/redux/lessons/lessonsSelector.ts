import { createSelector } from "reselect";
import config from "configs/lessons.config.json";
import { ILookup, IItem, ILesson } from "types/generalTypes";
import { RootState } from "redux/lessons/lessonsReducer";
interface ILessonsCount {
  [key: string]: number;
}

interface IChartResults {
  [key: string]: IItem;
}

interface ILookupsPerSchool {
  [key: string]: ILookup;
}
interface ILessonsState {
  [key: string]: RootState;
}

export const currentThemeSelector = (state: ILessonsState) =>
  state.lessons.isLightTheme;
export const dataIsLoadedSelector = (state: ILessonsState) =>
  state.lessons.isLoaded;
export const lessonsDataSelector = (state: ILessonsState) =>
  state.lessons.items;
export const selectedLessonSelector = (state: ILessonsState) =>
  state.lessons.selectedId;
export const countryFilteredValueSelector = (state: ILessonsState) =>
  state.lessons.countryFilteredValue;
export const campFilteredValueSelector = (state: ILessonsState) =>
  state.lessons.campFilteredValue;
export const schoolFilteredValueSelector = (state: ILessonsState) =>
  state.lessons.schoolFilteredValue;

export const lookupsSelector = createSelector(
  lessonsDataSelector,
  (lessons) => {
    const countries: ILookup = {};
    const camps: ILookup = {};
    const schools: ILookup = {};
    const countriesPerSchools: ILookupsPerSchool = {};
    const campsPerSchools: ILookupsPerSchool = {};

    /**
     * const countriesPerSchools= {country1:{school:true}}
     */
    for (const id in lessons) {
      const camp = lessons[id].camp;
      const country = lessons[id].country;
      const school = lessons[id].school;

      camps[camp] = true;
      countries[country] = true;
      schools[school] = true;

      countriesPerSchools[country] = {
        ...countriesPerSchools[country],
        [school]: true,
      };
      campsPerSchools[camp] = {
        ...campsPerSchools[camp],
        [school]: true,
      };
    }

    return {
      countries,
      camps,
      schools,
      countriesPerSchools,
      campsPerSchools,
    };
  }
);

export const filteredLessonsSelector = createSelector(
  countryFilteredValueSelector,
  campFilteredValueSelector,
  schoolFilteredValueSelector,
  lessonsDataSelector,
  (country, camp, school, lessons) => {
    const results: IChartResults = {};
    const lessonsPerSchool: ILessonsCount = {};
    const filteredData: {
      filterData: IChartResults;
      lessonsPerSchool: ILessonsCount;
      totalCount?: number;
    } = { filterData: results, lessonsPerSchool };
    //condition to filter only when we have 3 values from the 3 ddl (country/camp/school)
    if (country && camp && Object.keys(school).length) {
      let totalCount: number = 0;
      for (const id in lessons) {
        const item: ILesson = lessons[id];
        const itemsSchool = item.school;
        if (
          item.country === country &&
          item.camp === camp &&
          typeof school[itemsSchool] === "boolean"
        ) {
          const month = item.month;
          const noOfLessons = item.lessons;

          /** Note:
           * This solution's output contain multiple values for the same month
           * like in ids '620af3a40dca10f2707777f1' & '620af3a4b3e2bcfea9600576'
           * which lead to unCleared chart.
           */
          // if (!results[itemsSchool]) {
          // results[itemsSchool] = {
          //   label: "Lessons", //beside the value
          //   lineTension: 0.2,
          //   backgroundColor: "rgba(75,192,192,1)", //points colors
          //   borderColor: "rgba(0,0,0,1)", // line color
          //   borderWidth: 2,
          //   data: [
          //     {
          //       [month]: noOfLessons,
          //     },
          //   ],
          // };
          // } else {
          //   results[itemsSchool].data.push(item);
          // }

          //this solution to concat noOfLessons per month for the same filter criteria
          results[itemsSchool] = {
            ...results[itemsSchool],
            [month]: {
              ...item,
              [config.staticFieldsNames.noOfLessons]: results[itemsSchool]?.[
                month
              ]
                ? results[itemsSchool][month].lessons + noOfLessons
                : noOfLessons,
            },
          };

          lessonsPerSchool[itemsSchool] = lessonsPerSchool[itemsSchool]
            ? lessonsPerSchool[itemsSchool] + noOfLessons
            : noOfLessons;

          totalCount = totalCount + noOfLessons;
        }
      }
      return { filterData: results, lessonsPerSchool, totalCount };
    }
    return filteredData;
  }
);

export const selectedLessonDataSelector = createSelector(
  selectedLessonSelector,
  lessonsDataSelector,
  (selectedId, lessons) => {
    return selectedId ? lessons[selectedId] : "";
  }
);
