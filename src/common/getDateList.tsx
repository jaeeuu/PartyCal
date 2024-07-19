// import { toDate } from "../common/store";
import type { Dayjs } from "dayjs";
// import type { Accessor  } from "solid-js";

export type getDateListFunc = {
  all: number[];
  valid: [number, number];
};

export const getDateList = ( toDate: Dayjs ): getDateListFunc => {
  const result: number[] | null = [];
  const thisMonthCount: number = toDate.daysInMonth();
  const thisMonthStart: Dayjs = toDate.date(1);
  const thisMonthEnd: Dayjs = toDate.date(thisMonthCount);
  const thisMonthValid: [number, number] = [thisMonthStart.day(), thisMonthEnd.day()];

  const CalendarStart : Dayjs = thisMonthStart.day(0);
  if (CalendarStart.month() !== thisMonthStart.month()) {
    // const prevMonthCount: number = CalendarStart.month();
    const prevMonthList: number[] = Array.from(Array(thisMonthValid[0]), (_, i) => i + CalendarStart.date());
    result.push(...prevMonthList);
  }

  const thisMonthList: number[] = Array.from(Array(thisMonthCount), (_, i) => i + 1 );
  result.push(...thisMonthList);

  let nextLength = 6 - thisMonthValid[1];
  if ( result.length + nextLength < 42 ) nextLength += 7;

  const nextList = Array.from(Array(nextLength), (_, i) => i + 1);
  result.push(...nextList);

  thisMonthValid[1] = 42 - nextLength - 1;

  // // const resultList: number[][] = Array.from({ length: 6 }, (_, i) => result.slice(i * 7, i * 7 + 7));
  return { all: result, valid: thisMonthValid };
};

export default getDateList;

export type IndexDayjsProps = {
  year: number;
  month: number;
  index: number;
};

export const convertDayjsToIndex = ( thisDate: Dayjs | null ): IndexDayjsProps => {
  if (!thisDate) return { year: -1, month: -1, index: -1 };
  const thisMonthStart: Dayjs = thisDate.date(1);
  const thisMonthStartDay: number = thisMonthStart.day();
  return { year: thisDate.year() ,month: thisDate.month(), index: thisDate.date() + thisMonthStartDay - 1 };
};

export const convertIndexToDayjs = (thisDate: Dayjs, index: number): Dayjs => {
  const thisMonthStart: Dayjs = thisDate.date(1);
  const thisMonthStartDay: number = thisMonthStart.day();
  return thisMonthStart.add((index - thisMonthStartDay), 'day');
};