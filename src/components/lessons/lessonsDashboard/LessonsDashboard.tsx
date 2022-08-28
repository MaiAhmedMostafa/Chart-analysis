import { useDispatch, useSelector } from "react-redux";
import React, { useMemo } from "react";

import { useLocalization } from "handlers/useLocalization";
import enStrings from "./locale/lessonsDashboard.en.json";
import arStrings from "./locale/lessonsDashboard.ar.json";
import DropDownList from "components/common/dropDownList/DropDownList";
import LessonsChart from "components/lessons/lessonsChart/LessonsChart";
import SwitchButton from "components/common/switchButton/SwitchButton";
import {
  lookupsSelector,
  schoolFilteredValueSelector,
  campFilteredValueSelector,
  countryFilteredValueSelector,
  currentThemeSelector,
} from "redux/lessons/lessonsSelector";
import {
  setCountryFilter,
  setCampFilter,
  setSchoolFilter,
  switchTheme,
} from "redux/lessons/lessonsAction";
import { ILookup } from "types/generalTypes";

import "./LessonsDashboard.scss";

/**
 * Container component for dashboard
 * Contains:
 *    1) title
 *    2) Theme toggle button
 *    3) drop down lists for schools/camps/countries
 *    4) make use of Chart container section
 */
const LessonsDashboard = () => {
  const { t } = useLocalization({
    enStrings,
    arStrings,
  });

  const dispatch = useDispatch();
  const { countries, camps, schools, countriesPerSchools, campsPerSchools } =
    useSelector(lookupsSelector);
  const selectedCountry = useSelector(countryFilteredValueSelector);
  const selectedCamp = useSelector(campFilteredValueSelector);
  const selectedSchool = Object.keys(useSelector(schoolFilteredValueSelector));
  const isLightTheme = useSelector(currentThemeSelector);
  const onSelectCountry = (value: string) => {
    dispatch(setCountryFilter(value));
  };

  //filter schools in its ddl based on selected camp/country
  const displayedSchools = useMemo(() => {
    if (selectedCamp || selectedCountry) {
      const enabledSchools: ILookup = {};
      for (const school in schools) {
        if (
          (selectedCamp &&
            selectedCountry &&
            countriesPerSchools[selectedCountry][school] &&
            campsPerSchools[selectedCamp][school]) ||
          (selectedCamp &&
            !selectedCountry &&
            campsPerSchools[selectedCamp][school]) ||
          (!selectedCamp &&
            selectedCountry &&
            countriesPerSchools[selectedCountry][school])
        ) {
          enabledSchools[school] = true;
        }
      }
      return enabledSchools;
    } else {
      return schools;
    }
  }, [selectedCamp, selectedCountry]);

  const onSelectCamp = (value: string) => {
    dispatch(setCampFilter(value));
  };

  const onSelectSchool = (value: string) => {
    let output = { [value]: true };
    if (value.indexOf(t("selectAll")) !== -1) output = schools;
    dispatch(setSchoolFilter(output));
  };

  const getSchoolSelectedValue = () => {
    if (selectedSchool.length) {
      if (selectedSchool.length === 1) return selectedSchool[0];
      else return t("selectAll");
    } else return "";
  };

  const onToggleTheme = () => {
    dispatch(switchTheme());
  };

  return (
    <div className={"dashboard"} data-testid="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__analysis-chart">{t("analysisChart")}</div>
        <SwitchButton
          label={t("toggleTheme")}
          value={isLightTheme}
          onChange={onToggleTheme}
        />
      </div>
      <div className="dashboard__no-of-lessons">{t("noOfLessons")}</div>

      <div className={"ddl__container"}>
        <div className={"ddl__item"}>
          <DropDownList
            testId={"countryDDL"}
            label={t("country")}
            data={Object.keys(countries)}
            onselect={onSelectCountry}
            value={selectedCountry}
          />
        </div>
        <div className={"ddl__item"}>
          <DropDownList
            testId={"campDDL"}
            label={t("camp")}
            data={Object.keys(camps)}
            onselect={onSelectCamp}
            value={selectedCamp}
          />
        </div>
        <div className={"ddl__item"}>
          <DropDownList
            testId={"schoolDDL"}
            label={t("school")}
            data={[t("selectAll"), ...Object.keys(displayedSchools)]}
            onselect={onSelectSchool}
            value={getSchoolSelectedValue()}
          />
        </div>
      </div>

      <LessonsChart />
    </div>
  );
};

export default React.memo(LessonsDashboard);
