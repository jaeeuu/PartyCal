import stylex from '@stylexjs/stylex';
import { useNavigate } from '@solidjs/router';
import { baseStyles, flexStyles } from '~/common/share-styles';

const inStyles = stylex.create({
  box1: {
    width: "min(700px, 100%)",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
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
    <div {...stylex.attrs(baseStyles.root, flexStyles.center)}>
      <div {...stylex.attrs(flexStyles.center, inStyles.box1)}>
        <div {...stylex.attrs(flexStyles.sero, inStyles.buttonBox)}>
          {/* <button {...stylex.attrs(baseStyles.common, baseStyles.button, interactStyles.button, inStyles.button)} onClick={()=>navigate("/s/test")}>
            JOIN WITH CODE
          </button> */}
          <button {...stylex.attrs(baseStyles.button1, inStyles.button)} onClick={()=>navigate("/new")}>
            날짜 투표 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
