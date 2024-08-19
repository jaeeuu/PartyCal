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
          <link rel="preload" href="/fonts/css/basic_4567.css" as="style" fetchpriority="low"
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
