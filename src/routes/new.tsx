import * as stylex from '@stylexjs/stylex';
import { SetButtonBox, SetSwitch, SetButton, SetBox, SetCheckbox, SetInputBox  } from "~/components/SetBase";
import { createMemo, createSignal, Index, Show, createResource } from "solid-js";
import { oneDj, setStore } from '../common/stores';
import type { Dayjs } from "dayjs";
import SetPopUp from '../components/SetPopUp';
import { getDateList, convertDjToCell, isSameCell, isBeforeCell, isBetweenCell, convertCellToDj, isAfterCell, convertCellToNum } from '../common/dates';
import type { DateCell } from '../common/dates';
import ArrowRightSvg from '../assets/icons/arrow_right.svg';
import ArrowLeftSvg from '../assets/icons/arrow_left.svg';
import SelectDateSvg from '../assets/icons/select_date.svg';
import { showUpAni } from '~/common/animations';
import SetShare from '~/components/SetShare';
import calenderImage from '../assets/images/cal_re.avif';
import { useNavigate } from '@solidjs/router';

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
});

const ixStyles = stylex.create({
  box1box: {
    display: 'flex',
    width: "100%",
    justifyContent: "space-between",
    padding: '7px',
    alignItems: 'center',
  },
  box1text: {
    fontWeight: 700,
    fontSize: "21px",
    fontFamily: "'Basic Fonts'",
    paddingBottom: '20px',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    backgroundImage: 'linear-gradient(145deg, hsl(198.1, 100%, 46.1%) 0%, hsl(231.9, 68.6%, 72.5%) 55%)',
    letterSpacing: '-1px',
  },
  box1image: {
    position: 'relative',
    top: "-5px",
    right: "-10px",
    objectFit: 'contain',
    pointerEvents: 'none',
  },
  titleText1: {
    color: "#333e4b",
    fontSize: "23px",
    fontWeight: 700,
  },
  titleText2: {
    color: "#6b7784",
    fontSize: "16px",
    fontWeight: 500,
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
    lineHeight: '1.35',
  },
  selectButton: {
    width: '100%',
    ...stylex.include(inStyles.border),
    backgroundColor: "#f8f9fa",
    // color: "#004996",
    color: "#333e4b",
    padding: "20px",
    marginBottom: '20px',
    marginTop: '7px',
    fontWeight: 500,
    ...stylex.include(inStyles.flex),
    gap: '5px',
  },
  selectButtonOk: {
    color: '#8B95A1',
  },
  selectButtonHelp: {
    //marginBottom: '5px',
    marginLeft: '5px',
    fontSize: '12px',
    color: '#8B95A1',
    lineHeight: '1.35',
  },
  subDateBox: {
    ...stylex.include(inStyles.flex),
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: '10px',
    position: 'relative',
    // paddingTop: '10px',
    paddingBottom: '5px',
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
    top: '30px',
  },
  subDateButtonWrap: {
    ...stylex.include(inStyles.flex),
    position: 'absolute',
    right: '0px',
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
    // gap: "1px",
  },
  subCalTile: {
    ...stylex.include(inStyles.flex),
    justifyContent: 'center',
    aspectRatio: "1 / 1",
    cursor: "pointer",
    borderRadius: "16.5px",
    //...stylex.include(inStyles.border),
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
    fontWeight: 600,
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
    opacity: 0.4,
    fontWeight: 400,
  },
  subCalDisabled: {
    // opacity: 0.1,
    cursor: "default",
    pointerEvents: "none",
    borderStyle: "none",
    // color: "#e6adad"
    // opacity: 0.75,
    fontWeight: 400,
  },
  subCalActive: {
    backgroundColor: "#8b97ea",
    color: "#fff",
    borderStyle: "none",
    transform: {
      default: "scale(0.95)",
      ":is(:active)": "scale(0.9)",
      //eslint-disable-next-line
      ":not(:active):is(:hover)": {
        default: null,
        "@media (hover: hover)": "scale(1)",
      },
    },
    // fontWeight: 600,
  },
  calButtonBox: {
    ...stylex.include(inStyles.flex),
    width: "100%",
    gap: '20px',
    marginTop: '25px',
  },
  agree: {
    width: "100%",
  },
  genError: {
    paddingBottom: '30px',
    paddingLeft: '10px',
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

  const [genUid, setGenUid] = createSignal<string|null>(null);

  let calRef: HTMLDivElement | null = null;

  const weekList = ['일', '월', '화', '수', '목', '금', '토'];

  const handleMonthMove = (type: number) => {
    if (!calRef) return;
    calRef.getAnimations().forEach((ani) => ani.cancel());
    if (type === 1) setMainDj((prev) => prev.add(1,'month'));
    else setMainDj((prev) => prev.subtract(1,'month'));
    const keyframes = new KeyframeEffect(
      calRef,
      [
        { transform: type===1 ? 'translateX(75px)' : 'translateX(-75px)', opacity: 0 },
        { transform: 'translateX(0px)', opacity: 1 },
      ],
      { duration: 350, easing: "cubic-bezier(0.08,0.82,0.17,1)", iterations: 1, fill: 'both' },
    );
    const calAni = new Animation(keyframes);
    calAni.play();
    calAni.finished.then(() => calAni.cancel());
    // //@ts-expect-error
    // const trans = document.startViewTransition(()=>{
    //   if (type === 1) setMainDj((prev) => prev.add(1,'month'));
    //   else setMainDj((prev) => prev.subtract(1,'month'));
    // });
    // trans.ready.then(() => {
    //   document.documentElement.animate(
    //     {
    //       transform: ['scale(0.75)', 'scale(1)'],
    //       opacity: [0, 1],
    //     },
    //     {
    //       duration: 200,
    //       easing: "cubic-bezier(0.08,0.82,0.17,1)",
    //       pseudoElement: "::view-transition-new(slide)",
    //     }
    //   );
    //   document.documentElement.animate(
    //     {
    //       transform: ['translateX(0px)', `translateX(${type === 1 ? '-50px' : '50px'})`],
    //       opacity: [1, 0],
    //     },
    //     {
    //       duration: 200,
    //       easing: "cubic-bezier(0.08,0.82,0.17,1)",
    //       pseudoElement: "::view-transition-old(slide)",
    //     }
    //   );
    // });
  };

  const handleSelect = (it: DateCell, type: number) => {
    if (!it || !mainCell()) return;
    if (it.month !== mainCell().month) {
      if (convertCellToNum(it) > convertCellToNum(mainCell())) {
        handleMonthMove(1);
      } else {
        handleMonthMove(-1);
      }
    } else {
      if (type === 1) {
        setStartCell((prev) => {
          if (isSameCell(prev, it)) return memCell();
          else return it;
        });
      } else {
        setEndCell((prev) => {
          if (isSameCell(prev, it)) return memCell();
          else return it;
        });
      }
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
      if (prev === 1) setStartCell(memCell());
      else setEndCell(memCell());
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
  
  const handleMakeNew = () => {
    setSubPage(3);
    createResource(async () => {
      const res = await fetch("/apix/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          s: convertCellToNum(startCell()),
          c: convertCellToDj(endCell()).diff(convertCellToDj(startCell()), 'd'),
          t: name(),
          k: onlyKakao(),
        }),
      });
      res.json().then((data) => {
        setGenUid(data.id);
        setStore(data.id);
      }).catch(() => setGenUid("error"));
    });
  };

  const navigate = useNavigate();
  const handleClose = (type: number) => {
    if (type === 1 || type === 2) {
      handleCancel();
    } else {
      setSubPage(0);
      navigate('/');
    }
  };

  return (
    <>
      {/* <SetBox>
        <div>최근에 생성한 투표가 있어요.</div>
        <div>다시 공유 하시겠어요?</div>
        <SetButton mode='sub'>공유하기</SetButton>
      </SetBox> */}
      <SetBox>
        <div {...stylex.attrs(ixStyles.box1box)}>
          <div {...stylex.attrs(ixStyles.box1text)}>
            새로운 투표를 생성하고
            <br/>친구들과 함께
            <br/>일정을 정해보세요
          </div>
          <img {...stylex.attrs(ixStyles.box1image)} height="110px" width="110px" src={calenderImage} decoding='sync' alt="" />
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
            <SelectDateSvg width="20px" />
            <Show when={startCell()} fallback={<>구간의 첫 날짜를 선택하세요</>}>
              {`${startCell().year}년 ${startCell().month}월 ${startCell().day}일`}
            </Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>마지막 날</div>
          <div {...stylex.attrs(ixStyles.selectButtonHelp)}>최대 100일 간격만 선택할 수 있어요</div>
          <SetButtonBox sx={[ixStyles.selectButton, !endCell() && ixStyles.selectButtonOk]} onClick={()=>handleClickEnd()} disabled={!startCell()}>
            <SelectDateSvg width="20px" />
            <Show when={endCell()} fallback={<>마지막 날짜를 선택하세요</>}>
              {`${endCell().year}년 ${endCell().month}월 ${endCell().day}일`}
            </Show>
          </SetButtonBox>
          <div {...stylex.attrs(ixStyles.selectButtonText)}>옵션</div>
          <SetSwitch value={onlyKakao()} setValue={()=>setOnlyKakao((prev)=>!prev)}>카카오톡에서만 투표 허용</SetSwitch>
          <SetSwitch value={false} setValue={()=>true} disabled={true}>비밀번호 설정</SetSwitch>
        </div>
      </SetBox>
      <SetBox>
        <SetCheckbox value={agree()} setValue={()=>setAgree((prev)=>!prev)} sx={[ixStyles.agree]}>
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
      <SetPopUp show={subPage()>0} close={()=>handleClose(subPage())} isLong={true} isOnce={subPage()===1||subPage()===2||!!genUid()}>
        <Show when={subPage()===1||subPage()===2} fallback={
          <Show when={!!genUid()} fallback={<>&nbsp;</>}>
            <Show when={genUid() !== "error"} fallback={
              <>
                <div {...stylex.attrs(ixStyles.genError)}>
                  <div {...stylex.attrs(ixStyles.titleText1)}>알 수 없는 오류가 발생했습니다.</div>
                  <div {...stylex.attrs(ixStyles.titleText2)}>잠시 후 다시 시도해주세요.</div>
                </div>
                <SetButton mode="main" onClick={()=>handleClose(3)}>닫기</SetButton>
              </>
            }>
              <SetShare close={()=>handleClose(3)} id={genUid()}/>
            </Show>
          </Show>
        }>
          <div {...stylex.attrs(ixStyles.subDateBox)} ref={(e)=>showUpAni(e,1)}>
            <div {...stylex.attrs(ixStyles.subDateTextBox)}>
              <div {...stylex.attrs(ixStyles.subDateYear)}>{`${mainCell().year}년`}</div>
              <div {...stylex.attrs(ixStyles.subDateMonth)}>{`${mainCell().month}월`}</div>
            </div>
            <div {...stylex.attrs(ixStyles.subDateButtonWrap)}>
              <SetButtonBox onClick={() => handleMonthMove(-1)} sx={[ixStyles.subDateButtonBox]}>
                <ArrowLeftSvg width="22px" />
              </SetButtonBox>
              <SetButtonBox onClick={() => handleMonthMove(1)} sx={[ixStyles.subDateButtonBox]}>
                <ArrowRightSvg width="22px" />
              </SetButtonBox>
            </div>
            <div {...stylex.attrs(ixStyles.subDateHelp)}>
              <Show when={subPage()===1} fallback={<>구간의 마지막 날짜를 선택해주세요</>}>
                구간의 시작 날짜를 선택해주세요
              </Show>
            </div>
          </div>
          <div {...stylex.attrs(ixStyles.subCalBox)} ref={(e)=>(calRef=e,showUpAni(e,2))}>
            <Index each={weekList}>
              {(item) => (<div {...stylex.attrs(ixStyles.subCalTop)}>{item()}</div>)}
            </Index>
            <Show when={subPage() === 1} fallback={
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
                    onClick={()=> handleSelect(item(), 2)}
                  >
                    {item().day}
                  </div>
                )}
              </Index>
            }>
              <Index each={mainCellList()}>
                {(item) => (
                  <div
                    {...stylex.attrs(
                      ixStyles.subCalTile,
                      (item().month !== mainCell().month) && ixStyles.subCalOut,
                      isBeforeCell(item(), todayCell) && ixStyles.subCalDisabled,
                      isSameCell(item(), startCell()) && ixStyles.subCalActive,
                    )}
                    onClick={()=> handleSelect(item(), 1)}
                  >
                    {item().day}
                  </div>
                )}
              </Index>
            </Show>
          </div>
          <div {...stylex.attrs(ixStyles.calButtonBox)} ref={(e)=>showUpAni(e,3.5)}>
            <SetButton mode="sub" onClick={()=>handleCancel()}>취소</SetButton>
            <SetButton mode="main" onClick={()=>handleOk()} disabled={subPage()===1 ? !startCell() : !endCell()}>확인</SetButton>
          </div>
        </Show>
      </SetPopUp>
    </>
  );
}