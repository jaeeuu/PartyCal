"use client";
import { endOfMonth, getDate, getDay, getDaysInMonth, startOfMonth, startOfWeek } from 'date-fns';

export default function getCalendar(thisDate: Date = new Date()): [number[], [number, number]]{
  const thisStart = startOfMonth(thisDate);
  const thisEnd = endOfMonth(thisDate);

  const firstDay = startOfWeek(thisStart);
  const thisMonthIndex: [number, number] = [getDay(thisStart), getDay(thisEnd)];

  const result: number[] | null = [];
  if (thisMonthIndex[0] !== 0) {
    const prevList = Array.from(Array(getDay(thisStart)), (_, i) => i + getDate(firstDay));
    result.push(...prevList);
  }

  const thisMonthList: number[] = Array.from(Array(getDaysInMonth(thisDate)), (_, i) => i + 1 );
  result.push(...thisMonthList);

  let nextLength = 6 - thisMonthIndex[1];
  if ( result.length + nextLength < 42 ) {
    nextLength += 7;
  }
  const nextList = Array.from(Array(nextLength), (_, i) => i + 1);
  result.push(...nextList);

  thisMonthIndex[1] = 42 - nextLength - 1;

  // const resultList: number[][] = Array.from({ length: 6 }, (_, i) => result.slice(i * 7, i * 7 + 7));
  return [result, thisMonthIndex];
}