import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles, interactStyles } from '../common/group.stylex';
import { Title } from "@solidjs/meta";
import { useNavigate } from '@solidjs/router';

const addStyles = stylex.create({
  buttonBox: {
    width: "200px",
    gap: "50px",
  },
  button: {
    width: "100%",
    aspectRatio: "4/1",
    // fontFamily: "'basicfont'",
    // padding: "10px 20px 10px 20px",
    fontSize: "16px",
  },
});

export default function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <Title>PartyCal</Title>
      <div {...stylex.attrs(baseStyles.plain, flexStyles.center)}>
        <div {...stylex.attrs(flexStyles.sero, addStyles.buttonBox)}>
          <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.button)} onClick={()=>navigate("/s/test")}>
            JOIN WITH CODE
          </button>
          <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, addStyles.button)} onClick={()=>navigate("/new")}>
            MAKE NEW
          </button>
        </div>
      </div>
    </main>
  );
}
