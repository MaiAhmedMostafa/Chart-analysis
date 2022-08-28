import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import {
  dataIsLoadedSelector,
  currentThemeSelector,
} from "redux/lessons/lessonsSelector";
import { getLessonsData } from "redux/lessons/lessonsAction";
import LoadingScreen from "components/loadingScreen/LoadingScreen";
import LessonsDashboard from "components/lessons/lessonsDashboard/LessonsDashboard";
import "./LessonsContainer.scss";

const LessonsContainer = () => {
  const dispatch = useDispatch();
  const dataIsLoaded = useSelector(dataIsLoadedSelector);
  const isLightTheme = useSelector(currentThemeSelector);

  //fetch lessons data
  useEffect(() => {
    setTimeout(() => {
      dispatch(getLessonsData());
    }, 1000);
  }, []);

  return (
    <div className={`${isLightTheme ? "light-theme" : "dark-theme"}`}>
      {dataIsLoaded ? <LessonsDashboard /> : <LoadingScreen />}
    </div>
  );
};

export default React.memo(LessonsContainer);
