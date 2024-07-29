import { Title } from "@solidjs/meta";
import * as stylex from "@stylexjs/stylex";

const ixStyles = stylex.create({
  text: {
    width: "100%",
    textAlign: "center",
    color: "#333",
    fontWeight: 700,
  },
  text1: {
    fontSize: "100px",
  },
  text2: {
    fontSize: "57px",
    marginTop: "-40px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "70px",
  }
});

export default function NotFound() {
  return (
    <>
      <Title>Not Found</Title>
      <div {...stylex.attrs(ixStyles.box)}>
        <div {...stylex.attrs(ixStyles.text, ixStyles.text1)}>404</div>
        <div {...stylex.attrs(ixStyles.text, ixStyles.text2)}>ERROR</div>
      </div>
    </>
  );
}
