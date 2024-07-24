import type { Accessor, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { Index } from "solid-js";
import  stylex from "@stylexjs/stylex";
import type { getDateListFunc } from "~/common/getDateList";
import type { Dayjs } from "dayjs";


type SetCalendarProps = JSX.HTMLAttributes<HTMLDivElement> & {
  boolList: Accessor<boolean[]>;
  calendarList: Accessor<getDateListFunc>;
  DateRange: Accessor<[Dayjs | null, Dayjs | null]>;
};

const ixStyle = stylex.create({
  base: {

  },
});

export default function SetCalendarSingle(props: SetCalendarProps): JSX.Element {
  const [local, others] = splitProps(props, [
    'boolList',
    'calendarList',
    'DateRange',
  ]);
  //날짜가 자주 변함
  return (
    <div>
      <Index each={local.calendarList().all}>
        {(item, itemIndex) => (
          <div {...others}>
            A
          </div>
        )}
      </Index>
    </div>
  );
}

export function SetCalendarDrag(props: SetCalendarProps): JSX.Element {
  const [local, others] = splitProps(props, [
    'boolList',
    'calendarList',
    'DateRange',
  ]);
  //bool이 자주 변함
  return (
    <div>
      <Index each={local.boolList()}>
        {(item, itemIndex) => (
          <div>
            A
          </div>
        )}
      </Index>
    </div>
  );
}