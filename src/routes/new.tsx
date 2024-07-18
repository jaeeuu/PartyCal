import * as stylex from '@stylexjs/stylex';
import { Meta, MetaProvider } from "@solidjs/meta";
import { SetRootBox, SetButtonBox, SetSwitch, SetButton, SetBox } from "~/components/SetShared";
import { createMemo, createSignal, Index, Show } from "solid-js";
import { oneDate } from '~/common/store';
import type { Dayjs } from "dayjs";
import SetSubPage from '~/components/SetSubPage';
import getDateList from '~/common/getDateList';
import ArrowRightSvg from '~/assets/icons/arrow_right.svg';
import ArrowLeftSvg from '~/assets/icons/arrow_left.svg';
import SetMetaMain from '~/components/SetMeta';

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ixStyle = stylex.create({
  base: {
    backgroundColor: '#fff',
    borderRadius: '20px',
  },
  box: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
  },
  subTitleBox: {
    ...stylex.include(inStyles.flex),
    gap: '10px',
  },
  calBox: {
    width: "100%",
    height: "100%",
    userSelect: "none",
    display: "grid",
    gridTemplateRows: "repeat(6, 1fr)",
    gridTemplateColumns: "repeat(7, 1fr)",
    placeContent: "stretch",
    placeItems: "stretch",
    gap: "3px",
  },
  calItem: {
    aspectRatio: "1 / 1",
    cursor: "pointer",
    borderRadius: "12px",
  }
});

export default function New() {
  const [toDate, setToDate] = createSignal<Dayjs>(oneDate.clone());
  const dateList = createMemo(() => getDateList(toDate()));

  const [dateRange, setDateRange] = createSignal([null, null]);
  const [startDate, setStartDate] = createSignal(['','']);
  const [showSub, setShowSub] = createSignal(0);
  const [anonVote, setAnonVote] = createSignal(false);
  
  return (
    <SetRootBox>
      <SetMetaMain />
      <SetBox>
        <div>
          <p>일정 투표 시작 날짜를 선택하세요</p>
          <p>최대 31일을 선택할 수 있어요</p>
        </div>
        <div {...stylex.attrs(ixStyle.box)}>
          <SetButtonBox>
            <Show when={!isNaN(dateRange()[0])}><div onClick={()=>setShowSub(1)}>시작일을 선택하세요</div></Show>
            <Show when={isNaN(dateRange()[0])}><div>{dateRange()[0].format("YYYY[년] MM[월] DD[일]")}</div></Show>
          </SetButtonBox>
          <SetButtonBox>
            <Show when={!isNaN(dateRange()[1])}><div onClick={()=>setShowSub(2)}>종료일을 선택하세요</div></Show>
            <Show when={isNaN(dateRange()[1])}>{dateRange()[1].format("YYYY[년] MM[월] DD[일]")}</Show>
          </SetButtonBox>
          <SetSwitch text="익명 투표" value={anonVote} setValue={setAnonVote} />
        </div>
      </SetBox>
      <SetSubPage show={showSub} setShow={setShowSub}>
        <div {...stylex.attrs(ixStyle.subTitleBox)}>
          <SetButtonBox onClick={() => setToDate((prev) => prev.subtract(1,'month'))}>
            <ArrowLeftSvg width="20px" />
          </SetButtonBox>
          <p>{`${toDate().year()}년`}</p>
          <p>{`${toDate().month()+1}월`}</p>
          <SetButtonBox onClick={() => setToDate((prev) => prev.add(1,'month'))}>
            <ArrowRightSvg width="20px" />
          </SetButtonBox>
        </div>
        <Show when={showSub() === 1}>
          <div {...stylex.attrs(ixStyle.calBox)}>
            <Index each={dateList().all}>
              {(item, itemIndex) => (
                <div
                {...stylex.attrs(ixStyle.calItem)}
                  data-index={itemIndex}
                >
                  {item()}
                </div>
              )}
            </Index>
          </div>
        </Show>
      </SetSubPage>
    </SetRootBox>
  );
}