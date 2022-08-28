export interface ILesson {
  id: string;
  month: string;
  camp: string;
  country: string;
  school: string;
  lessons: number;
}

export interface IItem {
  [key: string]: ILesson;
}

export interface ILookup {
  [key: string]: boolean;
}

export interface IObjectOFStrings {
  [key: string]: string;
}
export interface IObjectOFStringsOrNumber {
  [key: string]: string | number;
}

export interface IObjectOFNumbers {
  [key: string]: number;
}

export interface ILineData {
  label?: string;
  lineTension: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth: number;
  data: ILesson[];
}
