import { SetBox } from "~/components/SetShared";
import { useLocation } from "@solidjs/router";
import { createResource, Show } from "solid-js";
// import * as stylex from "@stylexjs/stylex";
import Spinner from "~/components/Spinner";

// type CreateStateProps = null | {
//   s?: number;
//   c?: number;
//   t?: string;
//   k?: boolean;
// };

export default function CreatePage() {
  

  
  const [uid] = createResource(async () => {
    const location = useLocation();
    const res = await fetch("https://partycal.site/apix/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location.state || {}),
    });
    if (res.ok) return res.json();
    else return null;
  });


  return (
    <SetBox>
      <Show
        fallback={<Spinner />}
        when={uid()}>
          {JSON.stringify(uid())}
      </Show>
    </SetBox>
  );
}