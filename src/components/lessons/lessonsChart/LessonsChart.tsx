import { useDispatch, useSelector } from "react-redux";
import React, { useMemo } from "react";
import LineChart from "components/common/lineChart/lineChart";
import LessonsList from "components/lessons/lessonsList/LessonsList";
import { useLocalization } from "handlers/useLocalization";
import enStrings from "./locale/lessonsChart.en.json";
import arStrings from "./locale/lessonsChart.ar.json";

import {
  filteredLessonsSelector,
  schoolFilteredValueSelector,
} from "redux/lessons/lessonsSelector";
import { setSelectedLesson } from "redux/lessons/lessonsAction";
import { useNavigate } from "react-router-dom";

import config from "configs/lessons.config.json";
import { months } from "constants/enums";
import { ILesson, ILineData, IObjectOFStrings } from "types/generalTypes";

import "./LessonsChart.scss";

/**
 * Container component for Chart section
 * Include Chart itself & its legend
 */
const LessonsChart = () => {
  const { t } = useLocalization({
    enStrings,
    arStrings,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fields = config.staticFieldsNames;
  const selectedSchools = useSelector(schoolFilteredValueSelector);

  /**
   * onClick any point in the chart
   * >> redirect to another page and display this points details
   */
  const onPointsClick = (value: ILesson) => {
    dispatch(setSelectedLesson(value.id));
    const path = `details`;
    navigate(path);
  };

  const { filterData } = useSelector(filteredLessonsSelector);
  const orderedMonths = useMemo(() => {
    return Object.values(months);
  }, [months]);

  const { chartData, schoolsColor } = useMemo(() => {
    const data: ILineData[] = [];
    const schoolsColor: IObjectOFStrings = {};
    const chartConfig = {
      label: t("lessonsLabel"),
      ...config.chart,
    };
    for (const school in filterData) {
      if (selectedSchools[school]) {
        const lessonsCount = Object.values(filterData[school]).sort((a, b) => {
          return (
            orderedMonths.indexOf(a.month) - orderedMonths.indexOf(b.month)
          );
        });
        //set color for each school
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        schoolsColor[school] = color;
        data.push({
          ...chartConfig,
          borderColor: color,
          data: lessonsCount,
        });
      }
    }

    //default data structure if no filtered data yet
    if (!data.length)
      return {
        chartData: [
          {
            ...chartConfig,
            data: [],
          },
        ],
        schoolsColor,
      };

    return { chartData: data, schoolsColor };
  }, [filterData, selectedSchools]);

  return (
    <div className="dashboard-chart__container">
      <div className="dashboard-chart__chart">
        <LineChart
          datasets={chartData}
          labels={Object.values(months)}
          onClick={onPointsClick}
          xAxis={fields.month}
          yAxis={fields.noOfLessons}
        />
      </div>
      <div className="dashboard-chart__list">
        <LessonsList schoolsColor={schoolsColor} />
      </div>
    </div>
  );
};

export default React.memo(LessonsChart);
