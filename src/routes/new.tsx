import { createTileDrag } from '../components/tileDrag';
import { Index } from 'solid-js';
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
  const [tileRef, tileValue] = createTileDrag([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);
  return(
    <div {...stylex.attrs(baseStyles.plain, flexStyles.sero, flexStyles.center)}>
      <table ref={tileRef} {...stylex.attrs(addStyles.box)}>
        <tbody {...stylex.attrs()}>
          <Index each={tileValue()}>
            {(row) => (
              <tr {...stylex.attrs()}>
                <Index each={row()}>
                  {(col) => (
                    <td {...stylex.attrs(addStyles.box2, col() && addStyles.boxActive)}>{col().toString()}</td>
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