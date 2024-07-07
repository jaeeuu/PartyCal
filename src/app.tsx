import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "./fonts/css/basicFonts400.css";
import "./fonts/css/basicFonts500.css";
import "./fonts/css/basicFonts700.css";
import 'virtual:stylex.css';

export default function App() {
  // const pageOnEnter = (el, done) => {
  //   const a = el.animate([{ transform: "translateY(500px) scaleY(0)", overflowY: "hidden" }, { transform: 'translateY(0px) scaleY(1)', overflowY: "hidden" }], { duration: 1000, easing: materialEasing});
  //   a.finished.then(done);
  // };
  // const pageOnExit = (el, done) => {
  //   const a = el.animate([{ transform: 'translateY(0px) scaleY(1)', overflowY: "hidden" }, { transform: "translateY(-500px) scaleY(0)", overflowY: "hidden" }], { duration: 500, easing: "ease" });
  //   a.finished.then(done);
  // };
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>PARTYCAL</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
