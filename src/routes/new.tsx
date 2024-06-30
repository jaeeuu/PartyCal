// import { createTileDrag } from '../components/tileDrag';
import { Index, createSignal } from 'solid-js';
import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles } from '~/common/Group.stylex';

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
    cursor: "pointer"
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
  let startTile : [number, number, boolean] = [-1, -1, false];
  let memTile : boolean[][] = [];

  function handlePointerStart(e: Event, x: number, y: number) {
    if (('ontouchstart' in window && e.type.startsWith('touch')) && e.cancelable) e.preventDefault();

    setTile((prev) => {
      startTile = [x, y, !prev[x][y]];
      const newTableValues = prev.map(row => [...row]);
      newTableValues[x][y] = startTile[2];
      memTile = [...newTableValues];
      return newTableValues;
    });
  }
  function handlePointerMove(e: Event, x: number, y: number) {
    if (startTile[0] === -1) return;
    if ((e instanceof MouseEvent) && e.buttons !== 1) return;
    if (startTile[0] === x && startTile[1] === y) {
      setTile([...memTile]);
      return;
    }
  
    const minRow = Math.min(startTile[0], x);
    const maxRow = Math.max(startTile[0], x);
    const minCol = Math.min(startTile[1], y);
    const maxCol = Math.max(startTile[1], y);

    setTile((prev) => {
      const newTableValues = prev.map(row => [...row]);
      newTableValues.forEach((r, i) => {
          r.forEach((_, j) => {
            if (i < minRow || i > maxRow || j < minCol || j > maxCol) {
              newTableValues[i][j] = memTile[i][j];
            } else {
              newTableValues[i][j] = startTile[2];
            }
          });
        });
      return newTableValues;
    });
  }
  function handlePointerEnd(e: Event) {
    startTile = [-1, -1, false];
    if (e.cancelable) {
      e.preventDefault();
    };
  }

  return(
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
                      onTouchStart={(e)=>handlePointerStart(e, rowIndex, colIndex)}
                      onMouseDown={(e)=>handlePointerStart(e, rowIndex, colIndex)}
                      onTouchMove={(e)=>handlePointerMove(e, rowIndex, colIndex)}
                      onMouseOver={(e)=>handlePointerMove(e, rowIndex, colIndex)}
                      onTouchEnd={(e)=>handlePointerEnd(e)}
                      onMouseUp={(e)=>handlePointerEnd(e)}
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