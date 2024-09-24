import { oneDj } from "./stores";
import type { Dayjs } from "dayjs";

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
  const dj = oneDj.clone();
  if (!cell) return dj;
  return dj.year(cell.year).month(cell.month-1).date(cell.day);
};

export const convertCellToNum = (cell: DateCell): number => {
  if(!cell) return -1;
  else return cell.year * 10000 + cell.month * 100 + cell.day;
};

export const isBeforeCell = (it: DateCell, from: DateCell): boolean => {
  if(!it || !from) return false;
  else return (convertCellToNum(it) < convertCellToNum(from));
};

export const isAfterCell = (it: DateCell, to: DateCell): boolean => {
  if(!it || !to) return false;
  else return (convertCellToNum(it) > convertCellToNum(to));
};

export const isSameCell = (a: DateCell, b: DateCell): boolean => {
  if (!a || !b) return false;
  else return a.year === b.year && a.month === b.month && a.day === b.day;
};

export const isBetweenCell = (it: DateCell, from: DateCell, to: DateCell): boolean => {
  if (!it || !from || !to) return false;
  else {
    const itNum = convertCellToNum(it);
    return (itNum >= convertCellToNum(from) && itNum <= convertCellToNum(to));
  }
};