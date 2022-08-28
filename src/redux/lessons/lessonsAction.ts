import {
  GET_LESSONS_DATA,
  SET_COUNTRY_FILTER,
  SET_CAMP_FILTER,
  SET_SCHOOL_FILTER,
  SET_SELECTED_LESSON,
  TOGGLE_SCHOOL,
  SWITCH_THEME,
} from "redux/actionTypes";
import { ILookup } from "types/generalTypes";

// Action creators
export const getLessonsData = () => ({
  type: GET_LESSONS_DATA,
});

export const switchTheme = () => ({
  type: SWITCH_THEME,
});

export const setCountryFilter = (value: string) => ({
  type: SET_COUNTRY_FILTER,
  payload: value,
});

export const setCampFilter = (value: string) => ({
  type: SET_CAMP_FILTER,
  payload: value,
});

export const setSchoolFilter = (value: ILookup) => ({
  type: SET_SCHOOL_FILTER,
  payload: value,
});

export const setSelectedLesson = (value: string) => ({
  type: SET_SELECTED_LESSON,
  payload: value,
});

export const toggleSchool = (value: string) => ({
  type: TOGGLE_SCHOOL,
  payload: value,
});
