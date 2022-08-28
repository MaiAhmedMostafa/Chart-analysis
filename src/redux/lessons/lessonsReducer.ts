import {
  GET_LESSONS_DATA,
  SET_COUNTRY_FILTER,
  SET_CAMP_FILTER,
  SET_SCHOOL_FILTER,
  SET_SELECTED_LESSON,
  TOGGLE_SCHOOL,
  SWITCH_THEME,
} from "redux/actionTypes";
import data from "data.json";
import { ILesson, IItem, ILookup } from "types/generalTypes";
import config from "configs/lessons.config.json";

interface IAction {
  type: string;
  payload: any;
}

interface IDashboardState {
  items: IItem;
  isLoaded: boolean;
  isLightTheme: boolean;
  countryFilteredValue: string;
  campFilteredValue: string;
  schoolFilteredValue: ILookup;
  selectedId: string;
}

export const initialState: IDashboardState = {
  items: {},
  isLoaded: false,
  isLightTheme: config.isLightTheme,
  countryFilteredValue: "",
  campFilteredValue: "",
  schoolFilteredValue: {}, //{school:visibilitystate}
  selectedId: "",
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_LESSONS_DATA: {
      //these data should be retrieve from calling BE through redux middleware
      const items = { ...state.items };

      //saving data as object {id:item} to be easier in accessing/adding/updating/deleting for further requirements
      data.forEach((item: ILesson) => {
        const id = item.id;
        items[id] = item;
      });
      return {
        ...state,
        items,
        isLoaded: true,
      };
    }

    case SET_COUNTRY_FILTER: {
      return {
        ...state,
        countryFilteredValue: action.payload,
      };
    }

    case SET_CAMP_FILTER: {
      return {
        ...state,
        campFilteredValue: action.payload,
      };
    }

    case SET_SCHOOL_FILTER: {
      return {
        ...state,
        schoolFilteredValue: action.payload,
      };
    }

    case SET_SELECTED_LESSON: {
      return {
        ...state,
        selectedId: action.payload,
      };
    }

    case TOGGLE_SCHOOL: {
      return {
        ...state,
        schoolFilteredValue: {
          ...state.schoolFilteredValue,
          [action.payload]: !state.schoolFilteredValue[action.payload],
        },
      };
    }

    case SWITCH_THEME: {
      return {
        ...state,
        isLightTheme: !state.isLightTheme,
      };
    }
    default:
      return state;
  }
};
export default reducer;

export type RootState = ReturnType<typeof reducer>;
