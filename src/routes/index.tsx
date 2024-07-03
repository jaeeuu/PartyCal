import stylex from '@stylexjs/stylex';
import { baseStyles, flexStyles, interactStyles } from '../common/groups.stylex';
import { Title } from "@solidjs/meta";
import { useNavigate } from '@solidjs/router';

const inStyles = stylex.create({
  box1: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
  },
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
    <div {...stylex.attrs(baseStyles.plain, flexStyles.center)}>
      <div {...stylex.attrs(flexStyles.center, inStyles.box1)}>
        <div {...stylex.attrs(flexStyles.sero, inStyles.buttonBox)}>
          {/* <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, inStyles.button)} onClick={()=>navigate("/s/test")}>
            JOIN WITH CODE
          </button> */}
          <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, inStyles.button)} onClick={()=>navigate("/new")}>
            날짜 투표 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
