import { MetaProvider, Title, Link } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import type { RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import font_path from "./fonts/css/basic_4567.css?url";
import { SetRootBox } from "./components/SetShared";
//import 'virtual:stylex.css';

const Root = (props: RouteSectionProps) => {
  return(
    <MetaProvider>
      <Title>PARTYCAL</Title>
      <Link rel="stylesheet" href={font_path} />
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
