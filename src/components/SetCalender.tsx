import type { Accessor, JSX } from "solid-js";
import { Index } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import type { getDateListFunc } from "~/common/getDateList";

type SetCalendarProps<P = {}> = P & {
  selectList: Accessor<boolean[]>;
  calendarList: Accessor<getDateListFunc>
};

const ixStyle = stylex.create({
  base: {

  },
});

export default function SetCalendarSingle(props: SetCalendarProps): JSX.Element {
  //날짜가 자주 변함
  return (
    <div>
      <Index each={props.calendarList().all}>
        {(item, itemIndex) => (
          <div>
            A
          </div>
        )}
      </Index>
    </div>
  );
}

export function SetCalendarDrag(props: SetCalendarProps): JSX.Element {
  //bool이 자주 변함
  return (
    <div>
      <Index each={props.selectList()}>
        {(item, itemIndex) => (
          <div>
            A
          </div>
        )}
      </Index>
    </div>
  );
}