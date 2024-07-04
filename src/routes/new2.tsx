// import { createTileDrag } from '../components/tileDrag';
import { Index, createEffect, createSignal } from 'solid-js';
import stylex from '@stylexjs/stylex';
import { handlePointerEnd, handlePointerMove, handlePointerStart } from '../components/tileDrag';
import getCalender from '~/common/getCalender';
import { addMonths, getMonth, getYear } from 'date-fns';
import { baseStyles, flexStyles } from '~/common/share-styles';

const inStyles = stylex.create({
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

  const [calender, monthIndex] = getCalender(mountDate);
  const [cal, setCal] = createSignal<number[]>(calender);
  const [monIndex, setMonIndex] = createSignal<[number, number]>(monthIndex);

  const tileState: {currentTile: [number, boolean, number], memTile: boolean[]} = {
    currentTile: [-1, false, -1],
    memTile: [],
  };

  createEffect(() => {
    const [calender, monthIndex] = getCalender(thisDate());
    setCal(calender);
    setMonIndex(monthIndex);
    setTile(initialTile);
  });
  
  return (
    <div {...stylex.attrs(baseStyles.root, flexStyles.sero, flexStyles.center)}>
      <div {...stylex.attrs(flexStyles.sero, inStyles.seroBox)}>
        <div {...stylex.attrs(inStyles.title)}>{`${getYear(thisDate())}년 ${getMonth(thisDate())+1}월`}</div>
        <div {...stylex.attrs(inStyles.box)}>
          <Index each={tile()}>
            {(item, itemIndex) => (
              <div
                {...stylex.attrs(
                  inStyles.boxTile,
                  item() && inStyles.boxActive,
                  itemIndex < monIndex()[0] && inStyles.boxOut,
                  itemIndex > monIndex()[1] && inStyles.boxOut,
                )}
                data-index={itemIndex}
                onPointerDown={(e) => handlePointerStart(e, tileState, setTile)}
                onMouseOver={(e) => handlePointerMove(e, tileState, setTile)}
                onTouchMove={(e) => handlePointerMove(e, tileState, setTile)}
                onPointerUp={(e) => handlePointerEnd(e, tileState)}
              >{cal()[itemIndex]}</div>
            )}
          </Index>
        </div>
        <div {...stylex.attrs(flexStyles.center, inStyles.buttonBox)}>
          <button {...stylex.attrs(baseStyles.button2, inStyles.buttons)} onClick={() => setThisDate((prev) => addMonths(prev, -1))}>이전 달</button>
          <button {...stylex.attrs(baseStyles.button1, inStyles.buttons)} onClick={() => setThisDate((prev) => addMonths(prev, 1))}>다음 달</button>
        </div>
      </div>
    </div>
  );
}
