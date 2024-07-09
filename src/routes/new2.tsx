import * as stylex from '@stylexjs/stylex';
import { Index, createEffect, createSignal } from 'solid-js';
import handleTiles from '../components/tileDrag';
import getCalendar from '../common/getCalendar';
import { addMonths, getMonth, getYear } from 'date-fns';
import { SetButton, SetRootBox } from '~/components/SetShared';
import { flexStyles } from '~/common/share-styles';

const ixStyles = stylex.create({
  title: {
    fontSize: "25px",
    margin: "0px 0px 20px 20px",
    alignSelf: "flex-start",
  },
  seroBox: {
    width: "min(700px, 100%)",
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
  const mountDate = new Date();
  const [thisDate, setThisDate] = createSignal<Date>(mountDate);

  const [calender, monthIndex] = getCalendar(mountDate);
  const [cal, setCal] = createSignal<number[]>(calender);
  const [monIndex, setMonIndex] = createSignal<[number, number]>(monthIndex);

  const tileState: {currentTile: [number, boolean, number], memTile: boolean[]} = {
    currentTile: [-1, false, -1],
    memTile: [],
  };

  createEffect(() => {
    const [calender, monthIndex] = getCalendar(thisDate());
    setCal(calender);
    setMonIndex(monthIndex);
    setTile(initialTile);
  });
  
  return (
    <SetRootBox sx={[flexStyles.base, flexStyles.sero, flexStyles.center]}>
      <div {...stylex.attrs(flexStyles.sero, ixStyles.seroBox)}>
        <div {...stylex.attrs(ixStyles.title)}>{`${getYear(thisDate())}년 ${getMonth(thisDate())+1}월`}</div>
        <div {...stylex.attrs(ixStyles.box)}>
          <Index each={tile()}>
            {(item, itemIndex) => (
              <div
                {...stylex.attrs(
                  ixStyles.boxTile,
                  item() && ixStyles.boxActive,
                  itemIndex < monIndex()[0] && ixStyles.boxOut,
                  itemIndex > monIndex()[1] && ixStyles.boxOut,
                )}
                data-index={itemIndex}
                onPointerDown={(e) => handleTiles.handlePointerStart(e, tileState, setTile)}
                onMouseOver={(e) => handleTiles.handlePointerMove(e, tileState, setTile)}
                onTouchMove={(e) => handleTiles.handlePointerMove(e, tileState, setTile)}
                onPointerUp={(e) => handleTiles.handlePointerEnd(e, tileState)}
              >{cal()[itemIndex]}</div>
            )}
          </Index>
        </div>
        <div {...stylex.attrs(flexStyles.center, ixStyles.buttonBox)}>
          <SetButton mode='sub' sx={[ixStyles.buttons]} onClick={() => setThisDate((prev) => addMonths(prev, -1))}>이전 달</SetButton>
          <SetButton mode='main' sx={[ixStyles.buttons]} onClick={() => setThisDate((prev) => addMonths(prev, 1))}>다음 달</SetButton>
        </div>
      </div>
    </SetRootBox>
  );
}
