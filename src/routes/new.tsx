import * as stylex from '@stylexjs/stylex';
import { SetRootBox, SetButtonBox, SetSwitch, SetButton, SetBox, SetCheckbox, SetInput, SetInputBox } from "~/components/SetShared";
import { createMemo, createSignal, Index, Show } from "solid-js";
import { oneDate } from '~/common/store';
import type { Dayjs } from "dayjs";
import SetSubPage from '~/components/SetSubPage';
import getDateList, { convertDayjsToIndex, convertIndexToDayjs } from '~/common/getDateList';
import ArrowRightSvg from '~/assets/icons/arrow_right.svg';
import ArrowLeftSvg from '~/assets/icons/arrow_left.svg';
import SetMetaMain from '~/components/SetMeta';

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ixStyles = stylex.create({
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
  },
  selectBox: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    //gap: '20px',
    width: '100%',
    marginTop: "10px",
  },
  selectButtonText: {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '5px',
    marginLeft: '5px',
    color: '#6b7784',
  },
  selectButton: {
    width: '100%',
    borderColor: "#f2f3f5",
    borderStyle: "solid",
    borderWidth: "1.5px",
    // borderRadius: "15px",
    backgroundColor: "#f8f9fa",
    color: "#4e5a68",
    padding: "16.5px",
    marginBottom: '20px',
    fontWeight: 500,
    
  },
  selectButtonIn: {
    color: '#8B95A1',
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
      default: "#4e5a68",
      ":nth-child(7n+1)": "#803232",
    },
    transition: {
      default: "transform 1s var(--spring-easing), filter 0.4s linear",
      "@media (hover: none)": "transform 0.8s var(--spring-mobile), filter 0.4s linear",
    },
    transform: {
      default: "scale(1)",
      ":is(:active)": "scale(0.9)",
      //eslint-disable-next-line
      ":not(:active):is(:hover)": {
        default: null,
        "@media (hover: hover)": "scale(1.05)",
      },
    },
    filter: {
      default: "brightness(1)",
      ":is(:active)": "brightness(0.9)",
      //eslint-disable-next-line
      ":not(:active):is(:hover)": {
        default: null,
        "@media (hover: hover)": "brightness(0.95)",
      },
    },
  },
  subCalTop: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontSize: '15px',
    fontWeight: 600,
    paddingBottom: '5px',
    color: {
      default: "#6b7784",
      ":nth-child(7n+1)": "#ac4343",
    },
  },
  subCalDisabled: {
    cursor: "default",
    borderStyle: "none",
    opacity: 0.4,
  },
  subCalActive: {
    backgroundColor: '#3190f7',
    // transform: "scale(0.95)",
    color: "#fff",
  },
  calButtonBox: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    gap: '20px',
    marginTop: '40px',
  },
  agree: {
    width: "100%",
  },
});

export default function New() {
  const todayInfo = convertDayjsToIndex(oneDate.clone());

  const [toDayjs, setToDayjs] = createSignal<Dayjs>(oneDate.clone());
  const dateList = createMemo(() => getDateList(toDayjs()));
  const toDate = createMemo(() => convertDayjsToIndex(toDayjs()));

  const [startDayjs, setStartDayjs] = createSignal<Dayjs | null>(null);
  const startDate = createMemo(() => convertDayjsToIndex(startDayjs()));

  const [endDayjs, setEndDayjs] = createSignal<Dayjs | null>(null);
  const endDate = createMemo(() => convertDayjsToIndex(endDayjs()));

  const [showSub, setShowSub] = createSignal<number>(0);
  const [anonVote, setAnonVote] = createSignal<boolean>(false);
  const [agree, setAgree] = createSignal<boolean>(false);
  //이거 전부다 store로 옮기기?

  const weekList = ['일', '월', '화', '수', '목', '금', '토'];
  
  const handleStartSelect = (thisdate: Dayjs, index: number) => {
    setStartDayjs((prev) => {
      const temp = convertIndexToDayjs(thisdate, index);
      if (prev === null) return temp;
      else if (temp.isSame(prev)) return null;
      else return temp;
    });
  };

  const tileStyle = (itemIndex: number) => {
    if(itemIndex < dateList().valid[0] || itemIndex > dateList().valid[1]) return ixStyles.subCalDisabled;
    else if(todayInfo.year > toDate().year) return ixStyles.subCalDisabled;
    else if(todayInfo.year === toDate().year && todayInfo.month > toDate().month) return ixStyles.subCalDisabled;
    else if(todayInfo.year === toDate().year && todayInfo.month === toDate().month && todayInfo.index > itemIndex) return ixStyles.subCalDisabled;
    else if(startDate().year === toDate().year && startDate().month === toDate().month && startDate().index === itemIndex) return ixStyles.subCalActive;
    else return null;
  };
  return (
    <SetRootBox>
      <SetMetaMain />
      <SetBox>
        <div {...stylex.attrs(ixStyles.titleTextBox)}>
          <div {...stylex.attrs(ixStyles.titleText1)}>일정 투표 만들기</div>
          <div {...stylex.attrs(ixStyles.titleText2)}>최대 31일 간격만 선택할 수 있어요</div>
        </div>
        <SetInputBox
          mode="text"
          placeholder='투표의 이름을 알려주세요'
        >
          투표명
        </SetInputBox>
        <div {...stylex.attrs(ixStyles.selectBox)}>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>첫째 날</div>
          <SetButtonBox sx={[ixStyles.selectButton]} onClick={()=>setShowSub(1)}>
            <Show when={!startDayjs()}><div {...stylex.attrs(ixStyles.selectButtonIn)}>구간의 첫 날짜를 선택하세요</div></Show>
            <Show when={startDayjs()}><div>{startDayjs().format("YYYY[년] MM[월] DD[일]")}</div></Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>마지막 날</div>
          <SetButtonBox sx={[ixStyles.selectButton]} onClick={()=>setShowSub(2)} disabled={startDate()[1]===-1}>
            <Show when={!endDayjs()}><div {...stylex.attrs(ixStyles.selectButtonIn)}>마지막 날짜를 선택하세요</div></Show>
            <Show when={endDayjs()}>{startDayjs().format("YYYY[년] MM[월] DD[일]")}</Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>옵션</div>
          <SetSwitch value={anonVote} setValue={setAnonVote}>익명 투표</SetSwitch>
        </div>
      </SetBox>
      <SetBox>
        <SetCheckbox value={agree} setValue={setAgree} sx={[ixStyles.agree]}>
          서비스 제공을 위한 개인식별 정보 활용 동의
        </SetCheckbox>
        <SetButton mode="main">다음</SetButton>
      </SetBox>
      <SetSubPage show={showSub} setShow={setShowSub}>
        <Show when={showSub() === 1}>
          <div {...stylex.attrs(ixStyles.subTitleBox)}>
            <SetButtonBox onClick={() => setToDayjs((prev) => prev.subtract(1,'month'))} sx={[ixStyles.subTitleButtonBox]}>
              <ArrowLeftSvg width="17px" {...stylex.attrs(ixStyles.subTitleButton)} />
            </SetButtonBox>
            <div {...stylex.attrs(ixStyles.subTitleTextBox)}>
              <div {...stylex.attrs(ixStyles.subTitleYear)}>{`${toDate().year}년`}</div>
              <div {...stylex.attrs(ixStyles.subTitleMonth)}>{`${toDate().month+1}월`}</div>
            </div>
            <SetButtonBox onClick={() => setToDayjs((prev) => prev.add(1,'month'))} sx={[ixStyles.subTitleButtonBox]}>
              <ArrowRightSvg width="17px" {...stylex.attrs(ixStyles.subTitleButton)} />
            </SetButtonBox>
          </div>
          <div {...stylex.attrs(ixStyles.subCalBox)}>
            <Index each={weekList}>
              {(item) => (<div {...stylex.attrs(ixStyles.subCalTop)}>{item()}</div>)}
            </Index>
            <Index each={dateList().all}>
              {(item, itemIndex) => (
                <div
                  {...stylex.attrs(
                    ixStyles.subCalTile,
                    (itemIndex < dateList().valid[0] || itemIndex > dateList().valid[1]) && ixStyles.subCalDisabled,
                    (todayInfo.year > toDate().year) && ixStyles.subCalDisabled,
                    (todayInfo.year === toDate().year && todayInfo.month > toDate().month) && ixStyles.subCalDisabled,
                    (todayInfo.year === toDate().year && todayInfo.month === toDate().month && todayInfo.index > itemIndex) && ixStyles.subCalDisabled,
                    (startDate().year === toDate().year && startDate().month === toDate().month && startDate().index === itemIndex) && ixStyles.subCalActive,
                  )}
                  data-index={itemIndex}
                  onClick={()=> handleStartSelect(toDayjs(), itemIndex)}
                >
                  {item()}
                </div>
              )}
            </Index>
          </div>
          <div {...stylex.attrs(ixStyles.calButtonBox)}>
            <SetButton mode="sub" onClick={()=>{setShowSub(0);setStartDayjs(null);}}>취소</SetButton>
            <SetButton mode="main" onClick={()=>setShowSub(0)}>확인</SetButton>
          </div>
        </Show>
      </SetSubPage>
    </SetRootBox>
  );
}