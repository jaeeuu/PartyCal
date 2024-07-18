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
  titleTextBox: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
    gap: '3px',
    marginBottom: '20px',
    marginTop: '5px',
  },
  titleText1: {
    color: "#333e4b",
    fontSize: "24px",
    fontWeight: 700,
  },
  titleText2: {
    color: "#6b7784",
    fontSize: "14px",
    fontWeight: 400,
  },
  selectBox: {
    ...stylex.include(inStyles.flex),
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },
  selectButton: {
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    // borderRadius: "15px",
    backgroundColor: "#f8f9fa",
    color: "#4e5a68",
    padding: "12px 15px 12px 15px",
  },
  subTitleBox: {
    ...stylex.include(inStyles.flex),
    gap: '10px',
    marginTop: '20px',
    marginBottom: '40px',
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
    // padding: '6px',
    // backgroundColor: "#f2f3f5",
    // borderRadius: "16px",
  },
  calItem: {
    ...stylex.include(inStyles.flex),
    justifyContent: 'center',
    aspectRatio: "1 / 1",
    cursor: "pointer",
    borderRadius: "12px",
    // backgroundColor: "#fff",
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
  },
  calWeekTextBox: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    placeContent: "stretch",
  },
  calWeekText: {
    ...stylex.include(inStyles.flex),
    justifyContent: 'center',
    color: "#6b7784",
    fontSize: '15px',
    fontWeight: 500,
    marginBottom: '5px',
  },
  calWeekTextRed: {
    color: "#ac4343",
  },
  calButtonBox: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    gap: '20px',
    marginTop: '40px',
  }
});

export default function New() {
  const [toDate, setToDate] = createSignal<Dayjs>(oneDate.clone());
  const dateList = createMemo(() => getDateList(toDate()));

  const [dateRange, setDateRange] = createSignal([null, null]);
  const [startDate, setStartDate] = createSignal(['','']);
  const [showSub, setShowSub] = createSignal(0);
  const [anonVote, setAnonVote] = createSignal(false);

  const weekList = ['월', '화', '수', '목', '금', '토'];
  
  return (
    <SetRootBox>
      <SetMetaMain />
      <SetBox>
        <div {...stylex.attrs(ixStyle.titleTextBox)}>
          <div {...stylex.attrs(ixStyle.titleText1)}>일정 투표 만들기</div>
          <div {...stylex.attrs(ixStyle.titleText2)}>최대 31일 간격만 선택할 수 있어요</div>
        </div>
        <div {...stylex.attrs(ixStyle.selectBox)}>
          <SetButtonBox sx={[ixStyle.selectButton]} onClick={()=>setShowSub(1)}>
            <Show when={!isNaN(dateRange()[0])}><div>시작일을 선택하세요</div></Show>
            <Show when={isNaN(dateRange()[0])}><div>{dateRange()[0].format("YYYY[년] MM[월] DD[일]")}</div></Show>
          </SetButtonBox>
          <SetButtonBox sx={[ixStyle.selectButton]} onClick={()=>setShowSub(2)} disabled={startDate()[1]===''}>
            <Show when={!isNaN(dateRange()[1])}><div>종료일을 선택하세요</div></Show>
            <Show when={isNaN(dateRange()[1])}>{dateRange()[1].format("YYYY[년] MM[월] DD[일]")}</Show>
          </SetButtonBox>
          <SetSwitch text="익명 투표" value={anonVote} setValue={setAnonVote} />
          <SetButton mode="main">다음</SetButton>
        </div>
      </SetBox>
      <SetSubPage show={showSub} setShow={setShowSub}>
        <Show when={showSub() === 1}>
          <div {...stylex.attrs(ixStyle.subTitleBox)}>
            <SetButtonBox onClick={() => setToDate((prev) => prev.subtract(1,'month'))}>
              <ArrowLeftSvg width="20px" />
            </SetButtonBox>
            <div>{`${toDate().year()}년`}</div>
            <div>{`${toDate().month()+1}월`}</div>
            <SetButtonBox onClick={() => setToDate((prev) => prev.add(1,'month'))}>
              <ArrowRightSvg width="20px" />
            </SetButtonBox>
          </div>
          <div {...stylex.attrs(ixStyle.calWeekTextBox)}>
            <div {...stylex.attrs(ixStyle.calWeekText, ixStyle.calWeekTextRed)}>일</div>
            <Index each={weekList}>
              {(item) => (
                <div {...stylex.attrs(ixStyle.calWeekText)}>{item()}</div>
              )}
            </Index>
          </div>
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
          <div {...stylex.attrs(ixStyle.calButtonBox)}>
            <SetButton mode="sub" onClick={()=>setShowSub(0)}>취소</SetButton>
            <SetButton mode="main">확인</SetButton>
          </div>
        </Show>
      </SetSubPage>
    </SetRootBox>
  );
}