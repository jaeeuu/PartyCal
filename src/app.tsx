import { MetaProvider, Link } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import type { RouteSectionProps } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, onMount } from "solid-js";
import "./app.css";
import { SetRootBox } from "./components/SetShared";
//import 'virtual:stylex.css';

const Root = (props: RouteSectionProps) => {
  return(
    <MetaProvider>
      <Link rel="icon" href="data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M180 356a23 23 0 01-21-15l-37-95a15 15 0 00-8-8l-95-37a23 23 0 010-43l95-37a15 15 0 008-8l37-95a23 23 0 0143 0l37 95a15 15 0 008 8l94 36a23 23 0 0115 22 23 23 0 01-15 21l-95 37a15 15 0 00-8 8l-37 95a23 23 0 01-21 15zm250-19a13 13 0 01-12-8l-15-39a6 6 0 00-4-4l-39-15a13 13 0 010-24l39-15a6 6 0 004-4l15-38a13 13 0 0111-9 13 13 0 0114 8l15 39a6 6 0 004 4l39 15a13 13 0 010 24l-39 15a6 6 0 00-4 4l-15 39a13 13 0 01-12 8M303 511a16 16 0 01-15-10l-23-60a8 8 0 00-5-5l-60-23a16 16 0 010-30L260 359a8 8 0 005-5l23-60a17 17 0 0113-11 16 16 0 0117 10l23 60a8 8 0 005 5l60 23a16 16 0 010 30l-60 23a8 8 0 00-5 5l-23 60a16 16 0 01-15 10z' fill='%23C4C8F0'/%3E%3C/svg%3E" />
      <Link rel="icon" href="/pub/favicon.ico" />
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
  //     const link = document.getElementById('alter-icon') as HTMLLinkElement;
  //     if (link) {
  //       link.setAttribute('rel', 'icon');
  //     }
  //   }
  //   // if (check) {
  //   //   const link = document.createElement('link');
  //   //   link.rel = 'icon';
  //   //   link.href = '/pub/favicon.ico';
  //   //   document.head.appendChild(link);
  //   // }
  // });
  onMount(() => {
    const cookie = document.cookie;
    if (!cookie || !cookie.includes('session')) {
      fetch("https://partycal.site/api/session", {
        method: 'HEAD',
      });
    }
  });

  return (
    <Router
      root={(props) => Root(props)}
    >
      <FileRoutes />
    </Router>
  );
}
