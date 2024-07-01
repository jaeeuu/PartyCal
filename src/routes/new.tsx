// import { createTileDrag } from '../components/tileDrag';
import { Index, createEffect, createSignal } from 'solid-js';
import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles, interactStyles } from '~/common/Group.stylex';
import { handlePointerEnd, handlePointerMove, handlePointerStart } from '~/components/tileDrag';
import getCalender from '~/common/getCalender';
import { getMonth } from 'date-fns';

const addStyles = stylex.create({
  title: {
    fontSize: "30px",
    width: "100%",
    padding: "20px 0px 0px 20px",
  },
  box: {
    width: "min(700px, 100%)",
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
    aspectRatio: "1 / 1",
    borderRadius: "12px",
    color: "#575757",
    padding: "5px 0px 0px 10px",
    cursor: "pointer",
  },
  boxActive: {
    background: "#9AC5F4",
  },
  boxOut: {
    opacity: 0.5,
    pointerEvents: "none",
    cursor: "default",
    background: "#f0f0f0"
  },
  text: {
    width: "100%",
    wordWrap: "break-word",
  },
  buttonBox: {
    marginTop: "30px",
    gap: "20px",
  },
  buttons: {
    padding: "10px 20px 10px 20px",
  }
});

export default function New() {
  const [tile, setTile] = createSignal([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);
  const [calender, monthIndex] = getCalender(0);
  const [cal, setCal] = createSignal(calender);
  const [monIndex, setMonIndex] = createSignal<[number, number]>(monthIndex);
  const [mon, setMon] = createSignal(0);

  const tileVars = {
    startTile: [-1, -1, false] as [number, number, boolean],
    currentTile: [-1, -1] as [number, number],
    memTile: [] as boolean[][],
  };

  createEffect(() => {
    const [calender, monthIndex] = getCalender(mon());
    setCal(calender);
    setMonIndex(monthIndex);
  });
  
  return (
    <div {...stylex.attrs(baseStyles.plain, flexStyles.sero, flexStyles.center)}>
      <div {...stylex.attrs(addStyles.box)}>
        <div {...stylex.attrs(addStyles.title)}>{`${getMonth(new Date())+mon()} 월`}</div>
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
      <div {...stylex.attrs(flexStyles.garo, addStyles.buttonBox)}>
        <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.buttons)} onClick={() => setMon((prev) => prev - 1)}>이전 달</button>
        <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.buttons)} onClick={() => setMon((prev) => prev + 1)}>다음 달</button>
      </div>
    </div>
  );
}
