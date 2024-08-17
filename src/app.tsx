import { MetaProvider, Title, Link, Base } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import type { RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { SetRootBox } from "./components/SetShared";
//import 'virtual:stylex.css';

const Root = (props: RouteSectionProps) => {

  return(
    <MetaProvider>
      <Title>PARTYCAL</Title>
      <Base target="_self" href="https://partycal.site/" />
      <Link rel="icon" href="/favicon.svg" />
      <Link rel="preload" href="/fonts/css/basic_4567.css" as="style"
          // @ts-expect-error
          onload="this.rel='stylesheet';this.onload=null;" />
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
