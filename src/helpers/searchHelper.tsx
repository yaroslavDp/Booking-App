import { TripItemType } from "../types/TripType";

export interface initialFilterTypes {
    originalItems: TripItemType[] | [];
    duration: string;
    level: string;
    inputValue: string;
}

export const filterByInput = (arr: TripItemType[], key: string) => {
    return arr.filter((item) => item.title.toLowerCase().search(key.toLowerCase()) !== -1);
};
  
export const filterByLevel = (arr: TripItemType[], key: string) => {
    if (!key) return arr;
    return arr.filter((item) => item.level === key);
};
  
export const filterByDuration = (arr: TripItemType[], key: string) => {
    let filteredArr: TripItemType[] | [] = [];
    switch (key) {
      case "0_x_5":
        filteredArr = arr.filter((item) => item.duration < 5);
        break;
      case "5_x_10":
        filteredArr = arr.filter((item) => item.duration < 10);
        break;
      case "10_x":
        filteredArr = arr.filter((item) => item.duration >= 10);
        break;
      default:
        filteredArr = arr;
        break;
    }
    return filteredArr;
};
  
export const search = (initialState: initialFilterTypes) => {
    const { originalItems, duration, level, inputValue } = initialState;
    let filteredArr: TripItemType[] | [] = [];
  
    filteredArr = filterByInput(originalItems, inputValue);
    filteredArr = filterByLevel(filteredArr, level);
    filteredArr = filterByDuration(filteredArr, duration);
    return filteredArr;
};