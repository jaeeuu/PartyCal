import { createTileDrag } from '../components/tileDrag';
import { Index } from 'solid-js';
import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles } from '~/common/Group.stylex';

const addStyles = stylex.create({
  box: {
    width: "400px",
    height: "400px",
    // borderCollapse: "collapse",
    tableLayout: "fixed",
    borderSpacing: "10px",
  },
  boxIn: {
    textAlign: "center",
    background: "lightgreen",
    borderRadius: "12px",
    borderColor: "transparent",
    borderWidth: "1px",
  },
  boxActive: {
    background: "lightblue",
  },
  tr: {

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
    <main>
      <div {...stylex.attrs(baseStyles.plain, flexStyles.center)}>
        <table ref={tileRef} {...stylex.attrs(addStyles.box)}>
          {/* <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead> */}
          <tbody>
          <Index each={tileValue()}>
            {(row) => (
              <tr {...stylex.attrs(addStyles.tr)}>
                <Index each={row()}>
                  {(col) => (
                    <td {...stylex.attrs(addStyles.boxIn, col() && addStyles.boxActive)}>&nbsp;</td>
                  )}
                </Index>
              </tr>
            )}
          </Index>
          </tbody>
        </table>
      </div>
    </main>
  );
}