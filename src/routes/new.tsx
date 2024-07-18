import * as stylex from '@stylexjs/stylex';
import { SetRootBox, SetButtonBox, SetSwitch, SetButton, SetBox, SetCheckbox } from "~/components/SetShared";
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
    gap: '20px',
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
    justifyContent: 'space-between',
    width: '60%',
    // gap: '10px',
    marginTop: '20px',
    //marginBottom: '10px',
  },
  subTitleTextBox: {
    ...stylex.include(inStyles.flex),
    gap: '10px',
  },
  subTitleYear: {
    color: "#6b7784",
    fontWeight: 500,
    fontSize: "20px",
  },
  subTitleMonth: {
    color: "#333e4b",
    fontWeight: 700,
    fontSize: "20px",
  },
  subTitleButtonBox: {
    padding: '10px',
    backgroundColor: "#fff",
  },
  subTitleButton: {
    color: "#4e5a68"
  },
  subCalBox: {
    width: "100%",
    userSelect: "none",
    display: "grid",
    gridTemplateRows: "repeat(7, 1fr)",
    gridTemplateColumns: "repeat(7, 1fr)",
    placeContent: "stretch",
    placeItems: "stretch",
    gap: "3px",
  },
  subCalTile: {
    ...stylex.include(inStyles.flex),
    justifyContent: 'center',
    aspectRatio: "1 / 1",
    cursor: "pointer",
    borderRadius: "12px",
    // backgroundColor: "#fff",
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    backgroundColor: "#fff",
    color: {
      default: "#6b7784",
      ":nth-child(7n+1)": "#ac4343",
    },
    transition: {
      default: "transform 1s var(--spring-easing), backgroundColor 0.3s linear, filter 0.3s linear",
      "@media (hover: none)": "transform 0.8s var(--spring-mobile), backgroundColor 0.15s linear, filter 0.15s linear",
    },
    transform: {
      default: "scale(1)",
      ":is(:active)": "scale(0.9)",
    },
    filter: {
      default: "brightness(1)",
      ":is(:active)": "brightness(0.9)",
    }
  },
  subCalTop: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontSize: '15px',
    fontWeight: 500,
    paddingBottom: '5px',
    color: {
      default: "#4e5a68",
      ":nth-child(7n+1)": "#803232",
    }
  },
  subCalDisabled: {
    cursor: "default",
    borderStyle: "none",
    opacity: 0.4,
  },
  subCalActive: {
    backgroundColor: {
      default: '#3190f7',
      ':is(:active)': '#246ab6',
    },
    transform: "scale(0.95)",
    color: "#fff",
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
  const [startDate, setStartDate] = createSignal([-1,-1]);
  const [showSub, setShowSub] = createSignal(0);
  const [anonVote, setAnonVote] = createSignal(false);
  const [agree, setAgree] = createSignal(false);
  //이거 전부다 store로 옮기기

  const weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
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
          <SetButtonBox sx={[ixStyle.selectButton]} onClick={()=>setShowSub(2)} disabled={startDate()[1]===-1}>
            <Show when={!isNaN(dateRange()[1])}><div>종료일을 선택하세요</div></Show>
            <Show when={isNaN(dateRange()[1])}>{dateRange()[1].format("YYYY[년] MM[월] DD[일]")}</Show>
          </SetButtonBox>
          
        </div>
      </SetBox>
      <SetBox>
        <div>옵션</div>
        <SetSwitch text="익명 투표" value={anonVote} setValue={setAnonVote} />
      </SetBox>
      <SetBox>
        <SetCheckbox text="동의합니다" value={agree} setValue={setAgree} />
        <SetButton mode="main">다음</SetButton>
      </SetBox>
      <SetSubPage show={showSub} setShow={setShowSub}>
        <Show when={showSub() === 1}>
          <div {...stylex.attrs(ixStyle.subTitleBox)}>
            <SetButtonBox onClick={() => setToDate((prev) => prev.subtract(1,'month'))} sx={[ixStyle.subTitleButtonBox]}>
              <ArrowLeftSvg width="17px" {...stylex.attrs(ixStyle.subTitleButton)} />
            </SetButtonBox>
            <div {...stylex.attrs(ixStyle.subTitleTextBox)}>
              <div {...stylex.attrs(ixStyle.subTitleYear)}>{`${toDate().year()}년`}</div>
              <div {...stylex.attrs(ixStyle.subTitleMonth)}>{`${toDate().month()+1}월`}</div>
            </div>
            <SetButtonBox onClick={() => setToDate((prev) => prev.add(1,'month'))} sx={[ixStyle.subTitleButtonBox]}>
              <ArrowRightSvg width="17px" {...stylex.attrs(ixStyle.subTitleButton)} />
            </SetButtonBox>
          </div>
          <div {...stylex.attrs(ixStyle.subCalBox)}>
            <Index each={weekList}>
              {(item) => (<div {...stylex.attrs(ixStyle.subCalTop)}>{item()}</div>)}
            </Index>
            <Index each={dateList().all}>
              {(item, itemIndex) => (
                <div
                {...stylex.attrs(
                  ixStyle.subCalTile,
                  (itemIndex < dateList().valid[0] || itemIndex > dateList().valid[1]) && ixStyle.subCalDisabled,
                  (startDate()[0] === toDate().month() && startDate()[1] === itemIndex) && ixStyle.subCalActive,
                )}
                  data-index={itemIndex}
                  onClick={()=> setStartDate([toDate().month(), itemIndex])}
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