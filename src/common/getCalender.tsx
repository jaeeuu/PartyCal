import { endOfMonth, endOfWeek, getDaysInMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';

export default function getCalender(setMonth: number = 0) {
  const thisMonthIndex: [[number, number], [number, number]] = [[-1, -1], [-1, -1]];
  const thisDate = subMonths(new Date(), setMonth);
  const thisTotalDays = getDaysInMonth(thisDate);
  const thisStart = startOfMonth(thisDate);
  const thisEnd = endOfMonth(thisDate);
  const prevStart = startOfWeek(thisStart);
  const prevEnd = endOfWeek(thisEnd);

  const prevDayList = Array.from(Array());
  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1,
  );
  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);
  const weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    [],
  );

}