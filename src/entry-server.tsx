// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Party Calendar" />
          <title>PARTYCAL</title>
          <link rel="icon" sizes="any" href="data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M180 356a23 23 0 01-21-15l-37-95a15 15 0 00-8-8l-95-37a23 23 0 010-43l95-37a15 15 0 008-8l37-95a23 23 0 0143 0l37 95a15 15 0 008 8l94 36a23 23 0 0115 22 23 23 0 01-15 21l-95 37a15 15 0 00-8 8l-37 95a23 23 0 01-21 15zm250-19a13 13 0 01-12-8l-15-39a6 6 0 00-4-4l-39-15a13 13 0 010-24l39-15a6 6 0 004-4l15-38a13 13 0 0111-9 13 13 0 0114 8l15 39a6 6 0 004 4l39 15a13 13 0 010 24l-39 15a6 6 0 00-4 4l-15 39a13 13 0 01-12 8M303 511a16 16 0 01-15-10l-23-60a8 8 0 00-5-5l-60-23a16 16 0 010-30L260 359a8 8 0 005-5l23-60a17 17 0 0113-11 16 16 0 0117 10l23 60a8 8 0 005 5l60 23a16 16 0 010 30l-60 23a8 8 0 00-5 5l-23 60a16 16 0 01-15 10z' fill='%23C4C8F0'/%3E%3C/svg%3E" />
          {/* <link rel="alter-icon" href="/pub/favicon.ico" id="alter-icon" /> */}
          <base href="https://partycal.site/" />
          <link rel="preload" href="/fonts/css/basic_4567.css" as="style"
          // @ts-expect-error
          // eslint-disable-next-line
          onload="this.rel='stylesheet';this.onload=null;" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
