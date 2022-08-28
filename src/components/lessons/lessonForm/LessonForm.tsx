import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import { useLocalization } from "handlers/useLocalization";
import enStrings from "./locale/lessonsForm.en.json";
import arStrings from "./locale/lessonsForm.ar.json";
import { IObjectOFStringsOrNumber } from "types/generalTypes";
import { selectedLessonDataSelector } from "redux/lessons/lessonsSelector";
import { useNavigate } from "react-router-dom";

import "./LessonsForm.scss";

/**
 * Component to display lessons form (label : value)
 * displaying camp/ school/ country/ no-of-lessons
 */
const LessonsForm = () => {
  const { t } = useLocalization({
    enStrings,
    arStrings,
  });
  const navigate = useNavigate();

  const selectedData = useSelector(selectedLessonDataSelector);

  const displayedData = useMemo(() => {
    if (selectedData)
      return {
        [t("campLabel")]: selectedData.camp || "--",
        [t("schoolLabel")]: selectedData.school || "--",
        [t("countryLabel")]: selectedData.country || "--",
        [t("noOfLessonsLabel")]: selectedData.lessons || "--",
      };
    else return {};
  }, [selectedData]);

  const goBack = () => {
    navigate(-1);
  };

  /**
   * function to be used for displaying any field:value
   */
  const displayFields = (data: IObjectOFStringsOrNumber) => {
    return (
      <>
        {Object.keys(data).map((field, index) => {
          return (
            <div className="field-container" key={index}>
              <div data-testid={field} className="field-container__label">
                {field}
                {":"}
              </div>
              <div
                data-testid={`${field}_value`}
                className="field-container__value"
              >
                {data[field]}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="lesson">
      {selectedData ? (
        <div data-testid="lessonFormContainer" className="lesson__form">
          {displayFields(displayedData)}
        </div>
      ) : (
        ""
      )}
      <div className="lesson__navigator">
        <button onClick={goBack}>{t("back")}</button>
      </div>
    </div>
  );
};

export default React.memo(LessonsForm);
