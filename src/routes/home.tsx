import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles, interactStyles } from '../common/Group.stylex';
import { createTileDrag } from '../components/tileDrag';
import { Index } from 'solid-js';

const addStyles = stylex.create({
  root: {
    width: "100%",
  },
  buttonBox: {
    width: "200px",
    gap: "50px",
  },
  button: {
    width: "100%",
    aspectRatio: "4/1",
    fontFamily: "Segoe UI",
    // padding: "10px 20px 10px 20px",
    fontSize: "16px",
  },
});

export default function Home() {
  const [sref, svalue] = createTileDrag([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);
  return (
    <div {...stylex.attrs(baseStyles.plain, flexStyles.center)}>
      <div {...stylex.attrs(flexStyles.sero, addStyles.buttonBox)}>
        <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.button)}>
          JOIN WITH CODE
        </button>
        <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.button)}>
          MAKE NEW
        </button>
        <table ref={sref} class="timetable">
          <thead>
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
          </thead>
          <tbody>
          <Index each={svalue()}>
            {(row, rowIndex) => (
              <tr>
                <th>{rowIndex + 1}</th>
                <Index each={row()}>
                  {(col) => (
                    <td>{col().toString()}</td>
                  )}
                </Index>
              </tr>
            )}
          </Index>
          </tbody>
        </table>
      </div>
    </div>
  );
}