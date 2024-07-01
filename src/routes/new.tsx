// import { createTileDrag } from '../components/tileDrag';
import { Index, createSignal } from 'solid-js';
import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles } from '~/common/Group.stylex';
import { handlePointerEnd, handlePointerMove, handlePointerStart } from '~/components/tileDrag';

const addStyles = stylex.create({
  box: {
    width: "min(800px, 100%)",
    height: "500px",
    userSelect: "none",
    cursor: "pointer",
    display: "grid",
    gridTemplateRows: "repeat(6, 1fr)",
    gap: "2px",
    placeContent: "stretch",
  },
  boxLine: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "2px",
    placeItems: "stretch",
  },
  boxTile: {
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "12px",
    color: "#242424",
  },
  boxActive: {
    background: "#9AC5F4",
  },
  text: {
    width: "100%",
    wordWrap: "break-word",

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

  const tileVars = {
    startTile: [-1, -1, false] as [number, number, boolean],
    currentTile: [-1, -1] as [number, number],
    memTile: [] as boolean[][],
  };

  
  return (
    <div {...stylex.attrs(baseStyles.plain, flexStyles.sero, flexStyles.center)}>
      <div {...stylex.attrs(addStyles.box)}>
        <Index each={tile()}>
          {(row, rowIndex) => (
            <div {...stylex.attrs(addStyles.boxLine)}>
              <Index each={row()}>
                {(col, colIndex) => (
                  <span
                    {...stylex.attrs(addStyles.boxTile, col() && addStyles.boxActive)}
                    data-row={rowIndex}
                    data-col={colIndex}
                    onPointerDown={(e) => handlePointerStart(e, tileVars, setTile)}
                    onMouseOver={(e) => handlePointerMove(e, tileVars, setTile)}
                    onTouchMove={(e) => handlePointerMove(e, tileVars, setTile)}
                    onPointerUp={(e) => handlePointerEnd(e, tileVars)}
                  />
                )}
              </Index>
            </div>
          )}
        </Index>
      </div>
    </div>
  );
}
