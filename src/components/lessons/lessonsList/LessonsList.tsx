import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useLocalization } from "handlers/useLocalization";
import enStrings from "./locale/lessonsList.en.json";
import arStrings from "./locale/lessonsList.ar.json";

import {
  filteredLessonsSelector,
  campFilteredValueSelector,
  schoolFilteredValueSelector,
} from "redux/lessons/lessonsSelector";
import { toggleSchool } from "redux/lessons/lessonsAction";
import { IObjectOFStrings } from "types/generalTypes";
import "./LessonsList.scss";

/**
 * display lessons list section
 * Contains:
 *    1) total number of lessons for all selected schools
 *    2) list with items, each item describe number of lessons per school
 */
const LessonsList = ({ schoolsColor }: { schoolsColor?: IObjectOFStrings }) => {
  const { t } = useLocalization({
    enStrings,
    arStrings,
  });
  const dispatch = useDispatch();
  const { lessonsPerSchool, totalCount } = useSelector(filteredLessonsSelector);
  const selectedCamp = useSelector(campFilteredValueSelector);
  const selectedSchools = useSelector(schoolFilteredValueSelector);

  const displayFields = (
    noOfLessons: number,
    value: string,
    testId?: string
  ) => {
    return (
      <div>
        <div
          className="label"
          data-testid={"count_" + testId}
        >{`${noOfLessons} ${t("lessonsLabel")}`}</div>

        <div className="value" data-testid={"camp_" + testId}>{`${t(
          "inLabel"
        )} ${value}`}</div>
      </div>
    );
  };

  const onToggleSchool = (school: string) => {
    dispatch(toggleSchool(school));
  };

  return (
    <>
      {typeof totalCount === "number" ? (
        <div className="lessons-list">
          <div className="lessons-list__total-count">
            {displayFields(totalCount, selectedCamp, "totalNoOfLessons")}
          </div>
          <ul className="lessons-list__container">
            {Object.keys(lessonsPerSchool).map((field, index) => {
              return (
                <li
                  key={index}
                  className={`card__container ${
                    selectedSchools[field] ? "" : "card__hidden"
                  }`}
                  onClick={() => onToggleSchool(field)}
                  data-testid="lessonsList"
                  style={{ color: schoolsColor?.[field] }}
                >
                  {displayFields(lessonsPerSchool[field], field)}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="no-selected-data">{t("noSelectedData")}</div>
      )}
    </>
  );
};

export default React.memo(LessonsList);
