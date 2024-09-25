import { SetBox } from "~/components/SetBase";
import { useLocation } from "@solidjs/router";
import { createResource, Show } from "solid-js";
// import * as stylex from "@stylexjs/stylex";
//import Spinner from "~/components/Spinner";
import load_vid from "~/assets/images/load_vid.webm";

// type CreateStateProps = null | {
//   s?: number;
//   c?: number;
//   t?: string;
//   k?: boolean;
// };

export default function CreatePage() {
  const [uid] = createResource(async () => {
    const location = useLocation();
    const res = await fetch("/apix/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location.state || {}),
    });
    return res.json().then((data) => data.id).catch(() => "error");
  });


  return (
    <SetBox>
      <Show
        fallback={
          <video
            autoplay loop muted playsinline
            //@ts-expect-error
            disablepictureinpicture disableremoteplayback
            width="300px"
          >
            <source src={load_vid} type="video/webm" />
          </video>
        }
        when={uid()}>
          {JSON.stringify(uid())}
          <video
            autoplay loop muted playsinline
            //@ts-expect-error
            disablepictureinpicture disableremoteplayback
            width="300px"
          >
            <source src={load_vid} type="video/webm" />
          </video>
      </Show>
    </SetBox>
  );
}