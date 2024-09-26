import * as stylex from '@stylexjs/stylex';
import { SetButtonBox, SetSwitch, SetButton, SetBox, SetCheckbox, SetInputBox, SetA } from "~/components/SetBase";
import { createMemo, createSignal, Index, Show, createResource } from "solid-js";
import { oneDj } from '../common/stores';
import type { Dayjs } from "dayjs";
import SetPopUp from '../components/SetPopUp';
import { getDateList, convertDjToCell, isSameCell, isBeforeCell, isBetweenCell, convertCellToDj, isAfterCell, convertCellToNum } from '../common/dates';
import type { DateCell } from '../common/dates';
import ArrowRightSvg from '../assets/icons/arrow_right.svg';
import ArrowLeftSvg from '../assets/icons/arrow_left.svg';
import SelectDateSvg from '../assets/icons/select_date.svg';

const inStyles = stylex.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    borderColor: "#eff0f2",
    //borderColor: "#dddedf",
    borderStyle: "solid",
    borderWidth: "2px",
  },
  showup: {
    transform: {
      default: "translateY(0px)",
      '@starting-style': "translateY(50px)",
    },
    opacity: {
      default: 1,
      '@starting-style': 0,
    },
    transition: 'transform 0.75s cubic-bezier(0.08,0.82,0.17,1), opacity 0.75s cubic-bezier(0.08,0.82,0.17,1)',
  }
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
    fontWeight: 400,
    marginLeft: '5px',
    color: '#6b7784',
  },
  selectButton: {
    width: '100%',
    ...stylex.include(inStyles.border),
    backgroundColor: "#f8f9fa",
    // color: "#004996",
    color: "#333e4b",
    padding: "16.5px",
    marginBottom: '20px',
    marginTop: '5px',
    fontWeight: 500,
    ...stylex.include(inStyles.flex),
    gap: '5px',
  },
  selectButtonOk: {
    color: '#8B95A1',
  },
  selectButtonHelp: {
    marginBottom: '5px',
    marginLeft: '5px',
    fontSize: '11px',
    color: '#8B95A1',
  },
  subDateBox: {
    ...stylex.include(inStyles.flex),
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: '10px',
    position: 'relative',
    // paddingTop: '10px',
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.05s',
  },
  subDateTextBox: {
    ...stylex.include(inStyles.flex),
    gap: '10px',
  },
  subDateYear: {
    color: "#6b7784",
    fontWeight: 500,
    fontSize: "22px",
  },
  subDateMonth: {
    color: "#333e4b",
    fontWeight: 700,
    fontSize: "22px",
  },
  subDateHelp: {
    fontSize: '14px',
    color: '#8B95A1',
    //paddingLeft: '10px',
    position: 'absolute',
    top: '40px',
  },
  subDateButtonWrap: {
    ...stylex.include(inStyles.flex),
    // gap: '10px',
  },
  subDateButtonBox: {
    padding: '15px',
    backgroundColor: "#fff",
    color: "#6b7784",
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
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.1s',
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
      default: "#6b7784",
      ":nth-child(7n+1)": "#ac4343",
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
    fontSize: '17px',
    fontWeight: 700,
    // paddingBottom: '5px',
    // height: '50%',
    color: {
      default: "#4e5a68",
      ":nth-child(7n+1)": "#803232",
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
    // color: "#e6adad"
    // opacity: 0.75,
  },
  subCalActive: {
    backgroundColor: "#8b97ea",
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
    marginTop: '25px',
    ...stylex.include(inStyles.showup),
    transitionDelay: '0.15s',
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
  const [onlyKakao, setOnlyKakao] = createSignal<boolean>(true);
  const [agree, setAgree] = createSignal<boolean>(false);
  const [name, setName] = createSignal<string>('');

  const [memCell, setMemCell] = createSignal<DateCell>(null);

  const [loading, setLoading] = createSignal<boolean>(false);

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
  
  const handleMakeNew = async () => {
    // const [uid] = createResource(async () => {
    //   const res = await fetch("/apix/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       s: convertCellToNum(startCell()),
    //       c: convertCellToDj(endCell()).diff(convertCellToDj(startCell()), 'd'),
    //       t: name(),
    //       k: onlyKakao(),
    //     }),
    //   });
    //   res.json().then((data) => data.id).catch(() => "error");
    // });
    // sessionStorage.setItem('recent', JSON.stringify(uid()));
    setLoading(true);
    setSubPage(3);
  };

  return (
    <>
      {/* <SetBox>
        <div>최근에 생성한 투표가 있어요.</div>
        <div>다시 공유 하시겠어요?</div>
        <SetButton mode='sub'>공유하기</SetButton>
      </SetBox> */}
      <SetBox>
        <div {...stylex.attrs(ixStyles.titleTextBox)}>
          <div {...stylex.attrs(ixStyles.titleText1)}>새로운 투표 만들기</div>
          <div {...stylex.attrs(ixStyles.titleText2)}>친구들과 일정을 간단하게 투표해보세요</div>
        </div>
        <SetInputBox
          mode="text"
          name="title"
          placeholder='투표의 이름을 알려주세요'
          onInput={(e) => setName(e.currentTarget.value)}
          onKeyUp={(e) => {e.key === 'Enter' && handleClickStart();}}
          maxLength={20}
        >
          투표명
        </SetInputBox>
        <div {...stylex.attrs(ixStyles.selectBox)}>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>첫째 날</div>
          <SetButtonBox sx={[ixStyles.selectButton, !startCell() && ixStyles.selectButtonOk]} onClick={()=>handleClickStart()}>
            <Show when={!startCell()}><SelectDateSvg width="20px" />구간의 첫 날짜를 선택하세요</Show>
            <Show when={startCell()}><SelectDateSvg width="20px" />{`${startCell().year}년 ${startCell().month}월 ${startCell().day}일`}</Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>마지막 날</div>
          <div {...stylex.attrs(ixStyles.selectButtonHelp)}>최대 100일 간격만 선택할 수 있어요</div>
          <SetButtonBox sx={[ixStyles.selectButton, !endCell() && ixStyles.selectButtonOk]} onClick={()=>handleClickEnd()} disabled={!startCell()}>
            <Show when={!endCell()}><SelectDateSvg width="20px" />마지막 날짜를 선택하세요</Show>
            <Show when={endCell()}><SelectDateSvg width="20px" />{`${endCell().year}년 ${endCell().month}월 ${endCell().day}일`}</Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>옵션</div>
          <SetSwitch value={onlyKakao} setValue={setOnlyKakao}>카카오톡에서만 투표 허용하기</SetSwitch>
        </div>
      </SetBox>
      <SetBox>
        <SetCheckbox value={agree} setValue={setAgree} sx={[ixStyles.agree]}>
          서비스 제공을 위한 개인식별 정보 활용 동의
        </SetCheckbox>
        <SetButton
          mode="main"
          disabled={!startCell() || !endCell() || !agree() || !name()}
          onClick={handleMakeNew}
        >
          투표 생성하기
        </SetButton>
      </SetBox>
      <SetPopUp show={subPage} setShow={setSubPage} loading={loading()}>
        <Show when={subPage()===1||subPage()===2}>
          <div {...stylex.attrs(ixStyles.subDateBox)}>
            <div {...stylex.attrs(ixStyles.subDateTextBox)}>
              <div {...stylex.attrs(ixStyles.subDateYear)}>{`${mainCell().year}년`}</div>
              <div {...stylex.attrs(ixStyles.subDateMonth)}>{`${mainCell().month}월`}</div>
            </div>
            <div {...stylex.attrs(ixStyles.subDateButtonWrap)}>
              <SetButtonBox onClick={() => handlePrevMonth()} sx={[ixStyles.subDateButtonBox]}>
                <ArrowLeftSvg width="22px" />
              </SetButtonBox>
              <SetButtonBox onClick={() => handleNextMonth()} sx={[ixStyles.subDateButtonBox]}>
                <ArrowRightSvg width="22px" />
              </SetButtonBox>
            </div>
            <div {...stylex.attrs(ixStyles.subDateHelp)}>
              <Show when={subPage()===1}>구간의 시작 날짜를 선택해주세요</Show>
              <Show when={subPage()===2}>구간의 마지막 날짜를 선택해주세요</Show>
            </div>
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
        </Show>
        <Show when={subPage()===3||subPage()===4}>
          <div></div>
        </Show>
      </SetPopUp>
    </>
  );
}