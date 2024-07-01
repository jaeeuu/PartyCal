// import { createTileDrag } from '../components/tileDrag';
import { Index, createSignal } from 'solid-js';
import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles } from '~/common/Group.stylex';
import { handlePointerEnd, handlePointerMove, handlePointerStart } from '~/components/tileDrag';

const addStyles = stylex.create({
  box: {
    // borderCollapse: "collapse",
    tableLayout: "fixed",
    borderSpacing: "6px",
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1.6em",
    borderRadius: "0.4em",
    overflow: "hidden",
    userSelect: "none",
    cursor: "pointer",
    // touchAction: "none",
  },
  box2: {
    background: "#f3f3f3",
    borderRadius: "10px",
    minWidth: "none",
    height: "50px",
    padding: "20px",
    color: "#242424"
  },
  boxIn: {
    textAlign: "center",
    background: "#646cff",
    borderRadius: "12px",
    borderColor: "transparent",
    borderWidth: "1px",
  },
  boxActive: {
    background: "#646cff",
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
      <table {...stylex.attrs(addStyles.box)}>
        <tbody {...stylex.attrs()}>
          <Index each={tile()}>
            {(row, rowIndex) => (
              <tr {...stylex.attrs()}>
                <Index each={row()}>
                  {(col, colIndex) => (
                    <td
                      {...stylex.attrs(addStyles.box2, col() && addStyles.boxActive)}
                      data-row={rowIndex}
                      data-col={colIndex}
                      onPointerDown={(e) => handlePointerStart(e, tileVars, setTile)}
                      onMouseOver={(e) => handlePointerMove(e, tileVars, setTile)}
                      onTouchMove={(e) => handlePointerMove(e, tileVars, setTile)}
                      onPointerUp={(e) => handlePointerEnd(e, tileVars)}
                    >
                      {col().toString()}
                    </td>
                  )}
                </Index>
              </tr>
            )}
          </Index>
        </tbody>
      </table>
    </div>
  );
}
