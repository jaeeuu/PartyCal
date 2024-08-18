import { MetaProvider } from "@solidjs/meta";
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
      <Suspense>
        <SetRootBox>
          {props.children}
        </SetRootBox>
      </Suspense>
    </MetaProvider>
  );
};

export default function App() {
  // onMount(() => {
  //   const user = navigator.userAgent;
  //   const devices = ["iPhone", "iPad", "Android", "Macintosh", "Mac OS X"];
  //   const check = devices.some(d => user.includes(d));
  //   if (check) {
  //     const link = document.createElement('link');
  //     link.rel = 'icon';
  //     link.href = '/pub/favicon.ico';
  //     document.head.appendChild(link);
  //   }
  // });

  return (
    <Router
      root={(props) => Root(props)}
    >
      <FileRoutes />
    </Router>
  );
}
