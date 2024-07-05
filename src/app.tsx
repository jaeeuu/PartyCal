import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./styles/basicfontre400.css";
import "./styles/basicfontre500.css";
import "./styles/basicfontre600.css";
import "./styles/basicfontre700.css";
import "./app.css";


export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>PartyCal</Title>
          {/* <Meta lang="ko" />
          <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /> */}
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
