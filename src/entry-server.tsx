// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="ko">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
          <link rel="stylesheet" href="/fonts/css/basic_4.css" />
          <link rel="stylesheet" href="/fonts/css/basic_5.css" />
          <link rel="stylesheet" href="/fonts/css/basic_6.css" />
          <link rel="stylesheet" href="/fonts/css/basic_7.css" />
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
