/*
import * as stylex from '@stylexjs/stylex';
import { Index, createMemo, createSignal } from 'solid-js';
import handleTiles from '../components/tileDrag';
import getDateList from '../common/getDateList';
import { SetButton, SetRootBox } from '~/components/SetShared';
import { oneDate } from '~/common/store';
import type { Dayjs } from 'dayjs';

const ixStyles = stylex.create({
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: "25px",
    margin: "0px 0px 20px 20px",
    alignSelf: "flex-start",
  },
  seroBox: {
    width: "min(700px, 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: "100%",
    userSelect: "none",
    display: "grid",
    gridTemplateRows: "repeat(6, 1fr)",
    gap: "3px",
    placeContent: "stretch",
  
    gridTemplateColumns: "repeat(7, 1fr)",
    placeItems: "stretch",
    // webkitTouchCallout: "none",
    // touchAction: "manipulation",
    // overscrollBehavior: "none",
    // overflow: "hidden",
  },
  boxTile: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    aspectRatio: "1 / 1.2",
    borderRadius: "12px",
    color: "#575757",
    padding: "5px 0px 0px 10px",
    cursor: "pointer",
    touchAction: "manipulation",
    transition: {
      default: "transform 1s var(--spring-easing), backgroundColor 0.3s linear, color 0.3s linear",
      "@media (hover: none)": "transform 0.8s var(--spring-mobile), backgroundColor 0.15s linear, color 0.15s linear",
    },
  },
  boxActive: {
    backgroundColor: "#9AC5F4",
    color: "#ffffff",
    transform: {
      default: "scale(0.95)",
      "@media (hover: none)": "scale(0.9)",
    },
  },
  boxOut: {
    opacity: 0.5,
    pointerEvents: "none",
    cursor: "default",
    backgroundColor: "#f0f0f0",
    color: "#575757",
    transform: "scale(1)",
  },
  buttonBox: {
    marginTop: "30px",
    marginBottom: "30px",
    gap: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    width: "100px",
    height: "50px",
    fontSize: "16px",
  }
});

export default function New2() {
  const initialTile: boolean[] = Array(42).fill(false);
  const [tile, setTile] = createSignal<boolean[]>(initialTile);
  const [toDate, setToDate] = createSignal<Dayjs>(oneDate.clone());
  const dateList = createMemo(() => getDateList(toDate()));
  // 또는 oneDate = dayjs() 선언하고, 여기서 toDate를 createSignal로 선언 후 사용.

  const tileState: {currentTile: [number, boolean, number], memTile: boolean[]} = {
    currentTile: [-1, false, -1],
    memTile: [],
  };
  
  return (
    <SetRootBox sx={[ixStyles.flex]}>
      <div {...stylex.attrs(ixStyles.seroBox)}>
        <div {...stylex.attrs(ixStyles.title)}>{`${toDate().year()}년 ${toDate().month()+1}월`}</div>
        <div {...stylex.attrs(ixStyles.box)}>
          <Index each={tile()}>
            {(item, itemIndex) => (
              <div
                {...stylex.attrs(
                  ixStyles.boxTile,
                  item() && ixStyles.boxActive,
                  itemIndex < dateList().valid[0] && ixStyles.boxOut,
                  itemIndex > dateList().valid[1] && ixStyles.boxOut,
                )}
                data-index={itemIndex}
                onPointerDown={(e) => handleTiles.handlePointerStart(e, tileState, setTile)}
                onMouseOver={(e) => handleTiles.handlePointerMove(e, tileState, setTile)}
                onTouchMove={(e) => handleTiles.handlePointerMove(e, tileState, setTile)}
                onPointerUp={(e) => handleTiles.handlePointerEnd(e, tileState)}
              >{dateList().all[itemIndex]}</div>
            )}
          </Index>
        </div>
        <div {...stylex.attrs(ixStyles.buttonBox)}>
          <SetButton mode='sub' sx={[ixStyles.buttons]} onClick={() => setToDate((prev) => prev.subtract(1,'month'))}>이전 달</SetButton>
          <SetButton mode='main' sx={[ixStyles.buttons]} onClick={() => setToDate((prev) => prev.add(1,'month'))}>다음 달</SetButton>
        </div>
      </div>
    </SetRootBox>
  );
}
*/