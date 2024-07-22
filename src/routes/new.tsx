import * as stylex from '@stylexjs/stylex';
import { SetRootBox, SetButtonBox, SetSwitch, SetButton, SetBox, SetCheckbox, SetInputBox } from "~/components/SetShared";
import { createMemo, createSignal, Index, Show } from "solid-js";
import { oneDj } from '~/common/store';
import type { Dayjs } from "dayjs";
import SetSubPage from '~/components/SetSubPage';
import { getDateList, convertDjToCell, isSameCell, isBeforeCell, isBetweenCell, convertCellToDj, isAfterCell, convertCellToNum } from '~/common/getDateList';
import type { DateCell } from '~/common/getDateList';
import ArrowRightSvg from '~/assets/icons/arrow_right.svg';
import ArrowLeftSvg from '~/assets/icons/arrow_left.svg';
import SetMetaMain from '~/components/SetMeta';

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    borderColor: "#eff0f2",
    borderStyle: "solid",
    borderWidth: "1.5px",
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
    width: '100%',
    marginTop: "10px",
  },
  selectButtonText: {
    fontSize: '14px',
    fontWeight: 500,
    marginLeft: '5px',
    color: '#6b7784',
  },
  selectButton: {
    width: '100%',
    ...stylex.include(inStyles.border),
    backgroundColor: "#f8f9fa",
    color: "#3190f7",
    padding: "16.5px",
    marginBottom: '20px',
    marginTop: '5px',
    fontWeight: 500,
  },
  selectButtonIn: {
    color: '#8B95A1',
  },
  selectButtonHelp: {
    marginBottom: '5px',
    marginLeft: '5px',
    fontSize: '11px',
    color: '#8B95A1',
  },
  // subTitle: {
  //   fontSize: '14px',
  //   color: '#8B95A1',
  //   marginTop: '15px',
  // },
  subTitleBox: {
    ...stylex.include(inStyles.flex),
    justifyContent: 'space-between',
    width: '60%',
    marginTop: '15px',
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
    borderRadius: "16.5px",
    ...stylex.include(inStyles.border),
    backgroundColor: "#fff",
    color: {
      default: "#4e5a68",
      ":nth-child(7n+1)": "#803232",
    },
    transition: {
      default: "transform 1s var(--spring-easing), filter 0.2s linear, background-color 0.2s linear, color 0.2s linear",
      "@media (hover: none)": "transform 0.8s var(--spring-mobile), filter 0.2s linear, background-color 0.2s linear, color 0.2s linear",
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
  subCalOut: {
    // borderStyle: "none",
    opacity: 0.5,
  },
  subCalDisabled: {
    cursor: "default",
    pointerEvents: "none",
    borderStyle: "none",
    // opacity: 0.5,
  },
  subCalActive: {
    backgroundColor: '#67aaf5',
    color: "#fff",
    borderStyle: "none",
    transform: {
      default: "scale(0.9)",
      ":is(:active)": "scale(0.85)",
      //eslint-disable-next-line
      ":not(:active):is(:hover)": {
        default: null,
        "@media (hover: hover)": "scale(1)",
      },
    },
  },
  calButtonBox: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    gap: '20px',
    marginTop: '30px',
  },
  agree: {
    width: "100%",
  },
});

export default function NewPage() {
  const todayCell = convertDjToCell(oneDj.clone());

  const [mainDj, setMainDj] = createSignal<Dayjs>(oneDj.clone());
  const mainCell = createMemo<DateCell>(() => convertDjToCell(mainDj()));
  const mainCellList = createMemo<DateCell[]>(() => getDateList(mainDj()));

  const [startCell, setStartCell] = createSignal<DateCell>(null);
  const [endCell, setEndCell] = createSignal<DateCell>(null);
  const [limitCell, setLimitCell] = createSignal<DateCell>(null);

  const [subPage, setSubPage] = createSignal<number>(0);
  const [anonVote, setAnonVote] = createSignal<boolean>(true);
  const [agree, setAgree] = createSignal<boolean>(false);
  const [name, setName] = createSignal<string>('');

  const [memCell, setMemCell] = createSignal<DateCell>(null);
  let calRef: HTMLDivElement | null = null;
  let calAni: Animation | null = null;

  const weekList = ['일', '월', '화', '수', '목', '금', '토'];

  const handleNextMonth = () => {
    setMainDj((prev) => prev.add(1,'month'));
    if (!calRef) return;
    if (calAni) calAni.cancel();
    const keyframes = new KeyframeEffect(
      calRef,
      [
        { transform: 'translateX(75px)', opacity: 0 },
        { transform: 'translateX(0px)', opacity: 1 },
      ],
      { duration: 350, easing: "cubic-bezier(0.08,0.82,0.17,1)", iterations: 1 },
    );
    calAni = new Animation(keyframes, document.timeline);
    calAni.play();
  };

  const handlePrevMonth = () => {
    setMainDj((prev) => prev.subtract(1,'month'));
    if (!calRef) return;
    if (calAni) calAni.cancel();
    const keyframes = new KeyframeEffect(
      calRef,
      [
        { transform: 'translateX(-75px)', opacity: 0 },
        { transform: 'translateX(0px)', opacity: 1 },
      ],
      { duration: 350, easing: "cubic-bezier(0.08,0.82,0.17,1)", iterations: 1 },
    );
    calAni = new Animation(keyframes, document.timeline);
    calAni.play();
  };

  const handleStartSelect = (it: DateCell) => {
    if (!it || !mainCell()) return;
    if (it.month !== mainCell().month) {
      if (convertCellToNum(it) > convertCellToNum(mainCell())) {
        handleNextMonth();
      } else {
        handlePrevMonth();
      }
      return;
    } else {
      setStartCell((prev) => {
        if (isSameCell(prev, it)) return memCell();
        else return it;
      });
    }
    
  };

  const handleEndSelect = (it: DateCell) => {
    if (!it || !mainCell()) return;
    if (it.month !== mainCell().month) {
      if (convertCellToNum(it) > convertCellToNum(mainCell())) {
        handleNextMonth();
      } else {
        handlePrevMonth();
      }
    } else {
      setEndCell((prev) => {
        if (isSameCell(prev, it)) return memCell();
        else return it;
      });
    }
  };

  const handleOk = () => {
    setSubPage((prev) => {
      if (prev === 1){
        if (endCell()) setEndCell(null);
        setLimitCell(convertDjToCell(convertCellToDj(startCell()).add(100, 'day')));
      }
      return 0;
    });
  };

  const handleCancel = () => {
    setSubPage((prev) => {
      if (prev === 1) {
        setStartCell(memCell());
      } else {
        setEndCell(memCell());
      }
      return 0;
    });
  };

  const handleClickStart = () => {
    if (!startCell()) {
      setMemCell(null);
      setMainDj(oneDj.clone());
    }
    else {
      setMemCell(startCell());
      setMainDj(convertCellToDj(startCell()));
    }
    setSubPage(1);
  };

  const handleClickEnd = () => {
    if (!endCell()) {
      setMemCell(null);
      setMainDj(convertCellToDj(startCell()));
    }
    else {
      setMemCell(endCell());
      setMainDj(convertCellToDj(endCell()));
    }
    setSubPage(2);
  };
  
  return (
    <>
      <SetMetaMain />
      <SetBox>
        <div {...stylex.attrs(ixStyles.titleTextBox)}>
          <div {...stylex.attrs(ixStyles.titleText1)}>일정 투표 만들기</div>
          <div {...stylex.attrs(ixStyles.titleText2)}>친구들과 일정을 간단하게 투표해보세요</div>
        </div>
        <SetInputBox
          mode="text"
          placeholder='투표의 이름을 알려주세요'
          onInput={(e) => setName(e.currentTarget.value)}
        >
          투표명
        </SetInputBox>
        <div {...stylex.attrs(ixStyles.selectBox)}>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>첫째 날</div>
          <SetButtonBox sx={[ixStyles.selectButton]} onClick={()=>handleClickStart()}>
            <Show when={!startCell()}><div {...stylex.attrs(ixStyles.selectButtonIn)}>구간의 첫 날짜를 선택하세요</div></Show>
            <Show when={!!startCell()}><div>{`${startCell().year}년 ${startCell().month}월 ${startCell().day}일`}</div></Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>마지막 날</div>
          <div {...stylex.attrs(ixStyles.selectButtonHelp)}>최대 100일 간격만 선택할 수 있어요</div>
          <SetButtonBox sx={[ixStyles.selectButton]} onClick={()=>handleClickEnd()} disabled={!startCell()}>
            <Show when={!endCell()}><div {...stylex.attrs(ixStyles.selectButtonIn)}>마지막 날짜를 선택하세요</div></Show>
            <Show when={!!endCell()}>{`${endCell().year}년 ${endCell().month}월 ${endCell().day}일`}</Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>옵션</div>
          <SetSwitch value={anonVote} setValue={setAnonVote}>익명 투표</SetSwitch>
        </div>
      </SetBox>
      <SetBox>
        <SetCheckbox value={agree} setValue={setAgree} sx={[ixStyles.agree]}>
          서비스 제공을 위한 개인식별 정보 활용 동의
        </SetCheckbox>
        <SetButton
          mode="main"
          disabled={!startCell() || !endCell() || !agree() || !name()}
        >
          투표 생성하기
        </SetButton>
      </SetBox>
      <SetSubPage show={subPage} setShow={setSubPage}>
        <div {...stylex.attrs(ixStyles.subTitleBox)}>
          <SetButtonBox onClick={() => handlePrevMonth()} sx={[ixStyles.subTitleButtonBox]}>
            <ArrowLeftSvg width="17px" {...stylex.attrs(ixStyles.subTitleButton)} />
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.subTitleTextBox)}>
            <div {...stylex.attrs(ixStyles.subTitleYear)}>{`${mainCell().year}년`}</div>
            <div {...stylex.attrs(ixStyles.subTitleMonth)}>{`${mainCell().month}월`}</div>
          </div>
          <SetButtonBox onClick={() => handleNextMonth()} sx={[ixStyles.subTitleButtonBox]}>
            <ArrowRightSvg width="17px" {...stylex.attrs(ixStyles.subTitleButton)} />
          </SetButtonBox>
        </div>
        <div {...stylex.attrs(ixStyles.subCalBox)} ref={calRef}>
          <Index each={weekList}>
            {(item) => (<div {...stylex.attrs(ixStyles.subCalTop)}>{item()}</div>)}
          </Index>
          <Show when={subPage() === 1}>
            <Index each={mainCellList()}>
              {(item) => (
                <div
                  {...stylex.attrs(
                    ixStyles.subCalTile,
                    (item().month !== mainCell().month) && ixStyles.subCalOut,
                    isBeforeCell(item(), todayCell) && ixStyles.subCalDisabled,
                    isSameCell(item(), startCell()) && ixStyles.subCalActive,
                  )}
                  onClick={()=> handleStartSelect(item())}
                >
                  {item().day}
                </div>
              )}
            </Index>
          </Show>
          <Show when={subPage() === 2}>
            <Index each={mainCellList()}>
              {(item) => (
                <div
                  {...stylex.attrs(
                    ixStyles.subCalTile,
                    isBetweenCell(item(), startCell(), endCell()) && ixStyles.subCalActive,
                    isSameCell(item(), startCell()) && ixStyles.subCalActive,
                    (item().month !== mainCell().month) && ixStyles.subCalOut,
                    isBeforeCell(item(), startCell()) && ixStyles.subCalDisabled,
                    isAfterCell(item(), limitCell()) && ixStyles.subCalDisabled,
                  )}
                  onClick={()=> handleEndSelect(item())}
                >
                  {item().day}
                </div>
              )}
            </Index>
          </Show>
        </div>
        <div {...stylex.attrs(ixStyles.calButtonBox)}>
          <SetButton mode="sub" onClick={()=>handleCancel()}>취소</SetButton>
          <SetButton mode="main" onClick={()=>handleOk()} disabled={subPage()===1 ? !startCell() : !endCell()}>확인</SetButton>
        </div>
      </SetSubPage>
    </>
  );
}