// import { createTileDrag } from '../components/tileDrag';
import { Index, createEffect, createSignal } from 'solid-js';
import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles, interactStyles } from '~/common/Group.stylex';
import { handlePointerEnd, handlePointerMove, handlePointerStart } from '~/components/tileDrag';
import getCalender from '~/common/getCalender';
import { getMonth, getYear } from 'date-fns';

const addStyles = stylex.create({
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
    userSelect: "none",
    display: "grid",
    gridTemplateRows: "repeat(6, 1fr)",
    gap: "3px",
    placeContent: "stretch",
  },
  boxLine: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "3px",
    placeItems: "stretch",
  },
  boxTile: {
    background: "rgba(255, 255, 255, 0.5)",
    aspectRatio: "1 / 1.2",
    borderRadius: "12px",
    color: "#575757",
    padding: "5px 0px 0px 10px",
    cursor: "pointer",
    touchAction: "manipulation",
    transition: {
      default: "transform 1s var(--spring-easing)",
      "@media (hover: none)": "transform 0.8s var(--spring-mobile)",
    },
  },
  boxActive: {
    background: "#9AC5F4",
    transform: {
      default: "scale(0.95)",
      "@media (hover: none)": "scale(0.9)",
    },
  },
  boxOut: {
    opacity: 0.5,
    pointerEvents: "none",
    cursor: "default",
    background: "#f0f0f0",
    transform: "scale(1)",
  },
  buttonBox: {
    width: "80%",
    marginTop: "30px",
    gap: "30px",
  },
  buttons: {
    width: "100px",
    height: "50px",
    fontSize: "16px",
  }
});

export default function New() {
  const initialTile = [
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ];
  const [tile, setTile] = createSignal(initialTile);
  const [calender, monthIndex, thDate] = getCalender(0);
  const [cal, setCal] = createSignal(calender);
  const [monIndex, setMonIndex] = createSignal<[number, number]>(monthIndex);
  const [thisDate, setThisDate] = createSignal(thDate);
  const [mon, setMon] = createSignal(0);

  const tileVars = {
    startTile: [-1, -1, false] as [number, number, boolean],
    currentTile: [-1, -1] as [number, number],
    memTile: [] as boolean[][],
  };

  createEffect(() => {
    const [calender, monthIndex, thDate] = getCalender(mon());
    setCal(calender);
    setMonIndex(monthIndex);
    setThisDate(thDate);
    setTile(initialTile);
  });
  
  return (
    <div {...stylex.attrs(baseStyles.plain, flexStyles.sero, flexStyles.center)}>
      <div {...stylex.attrs(flexStyles.sero, addStyles.seroBox)}>
        <div {...stylex.attrs(addStyles.title)}>{`${getYear(thisDate())}년 ${getMonth(thisDate())+1}월`}</div>
        <div {...stylex.attrs(addStyles.box)}>
          <Index each={tile()}>
            {(row, rowIndex) => (
              <div {...stylex.attrs(addStyles.boxLine)}>
                <Index each={row()}>
                  {(col, colIndex) => (
                    <div
                      {...stylex.attrs(
                        addStyles.boxTile,
                        col() && addStyles.boxActive,
                        (rowIndex * 7 + colIndex) < monIndex()[0] && addStyles.boxOut,
                        (rowIndex * 7 + colIndex) > monIndex()[1] && addStyles.boxOut,
                      )}
                      data-row={rowIndex}
                      data-col={colIndex}
                      onPointerDown={(e) => handlePointerStart(e, tileVars, setTile)}
                      onMouseOver={(e) => handlePointerMove(e, tileVars, setTile)}
                      onTouchMove={(e) => handlePointerMove(e, tileVars, setTile)}
                      onPointerUp={(e) => handlePointerEnd(e, tileVars)}
                    >{cal()[rowIndex][colIndex]}</div>
                  )}
                </Index>
              </div>
            )}
          </Index>
        </div>
        <div {...stylex.attrs(flexStyles.center, addStyles.buttonBox)}>
          <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.buttons)} onClick={() => setMon((prev) => prev - 1)}>이전 달</button>
          <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.buttons)} onClick={() => setMon((prev) => prev + 1)}>다음 달</button>
        </div>
      </div>
    </div>
  );
}
