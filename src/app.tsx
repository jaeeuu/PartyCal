import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import type { RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "./fonts/css/basicFonts400.css";
import "./fonts/css/basicFonts500.css";
import "./fonts/css/basicFonts600.css";
import "./fonts/css/basicFonts700.css";
import { SetRootBox } from "./components/SetShared";
//import 'virtual:stylex.css';

const Root = (props: RouteSectionProps) => {
  return(
    <MetaProvider>
      <Title>PARTYCAL</Title>
      <Suspense>
        <SetRootBox>
          {props.children}
        </SetRootBox>
      </Suspense>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router
      root={(props) => Root(props)}
    >
      <FileRoutes />
    </Router>
  );
}
