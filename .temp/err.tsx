import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import * as stylex from "@stylexjs/stylex";

const ixStyles = stylex.create({
  text: {
    width: "100%",
    textAlign: "center",
    color: "#333",
    fontWeight: 700,
  },
  text1: {
    fontFamily: "Verdana",
    fontSize: "100px",
  },
  text2: {
    fontFamily: "Verdana",
    fontSize: "50px",
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
      <HttpStatusCode code={404} />
      <div {...stylex.attrs(ixStyles.box)}>
        <div {...stylex.attrs(ixStyles.text, ixStyles.text1)}>404</div>
        <div {...stylex.attrs(ixStyles.text, ixStyles.text2)}>ERROR</div>
      </div>
    </>
  );
}
