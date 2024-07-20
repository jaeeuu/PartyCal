// import { toDate } from "../common/store";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
// import type { Accessor  } from "solid-js";

export type DateCell = null | {
  year: number;
  month: number;
  day: number;
};

export const getDateList = ( toDate: Dayjs ): DateCell[] => {

  const addList = (dj: Dayjs, count: number, addStart: number = 1): DateCell[] => {
    if(count !== 0){
      const year = dj.year();
      const month = dj.month();
      const list: DateCell[] = Array.from(Array(count), (_, i) => ({ year: year, month: month+1, day: i + addStart }));
      return list;
    }
    return [];
  };

  const result: DateCell[] = [];
  const thisStart: Dayjs = toDate.date(1);

  const prevStart: Dayjs = thisStart.day(0);
  const prevCount: number = thisStart.day();
  const prevStartDate: number = prevStart.date();
  result.push(...addList(prevStart, prevCount, prevStartDate));

  const thisCount: number = toDate.daysInMonth();
  result.push(...addList(thisStart, thisCount));

  const nextDj: Dayjs = thisStart.add(1, 'month');
  const nextCount: number = 42 - prevCount - thisCount;
  result.push(...addList(nextDj, nextCount));

  return result;
};

export const convertDjToCell = (dj: Dayjs): DateCell => {
  if (!dj) return { year: -1, month: -1, day: -1 };
  return { year: dj.year(), month: dj.month()+1, day: dj.date() };
};

export const convertCellToDj = (cell: DateCell): Dayjs => {
  if (!cell) return dayjs();
  return dayjs(new Date(cell.year, cell.month, cell.day));
};

export const convertCellToNum = (cell: DateCell): number => {
  if(!cell) return -1;
  else return cell.year * 10000 + cell.month * 100 + cell.day;
};

export const isBeforeCell = (it: DateCell, from: DateCell): boolean => {
  if(!it || !from) return false;
  else return (convertCellToNum(it) < convertCellToNum(from));
  // else if(from.year > it.year) return true;
  // else if(from.year === it.year && from.month > it.month) return true;
  // else if(from.year === it.year && from.month === it.month && from.day > it.day) return true;
  // else return false;
};

export const isSameCell = (a: DateCell, b: DateCell): boolean => {
  if (!a || !b) return false;
  else return a.year === b.year && a.month === b.month && a.day === b.day;
};

export const isBetweenCell = (it: DateCell, from: DateCell, to: DateCell): boolean => {
  if (!it || !from || !to) return false;
  else {
    const itNum = convertCellToNum(it);
    const fromNum = convertCellToNum(from);
    const toNum = convertCellToNum(to);
    return (itNum > fromNum && itNum < toNum);
  };
  // else if (it.year < from.year) return false;
  // else if (it.year === from.year && it.month < from.month) return false;
  // else if (it.year === from.year && it.month === from.month && it.day < from.day) return false;
  // else if (it.year > to.year) return false;
  // else if (it.year === to.year && it.month > to.month) return false;
  // else if (it.year === to.year && it.month === to.month && it.day > to.day) return false;
  // else return (it.day > from.day && it.day < to.day);
};

// export type IndexDayjsProps = {
//   year: number;
//   month: number;
//   index: number;
// };

// export const convertDayjsToIndex = ( thisDate: Dayjs | null ): IndexDayjsProps => {
//   if (!thisDate) return { year: -1, month: -1, index: -1 };
//   const thisMonthStart: Dayjs = thisDate.date(1);
//   const thisMonthStartDay: number = thisMonthStart.day();
//   return { year: thisDate.year() ,month: thisDate.month(), index: thisDate.date() + thisMonthStartDay - 1 };
// };

// export const convertIndexToDayjs = (thisDate: Dayjs, index: number): Dayjs => {
//   const thisMonthStart: Dayjs = thisDate.date(1);
//   const thisMonthStartDay: number = thisMonthStart.day();
//   return thisMonthStart.add((index - thisMonthStartDay), 'day');
// };