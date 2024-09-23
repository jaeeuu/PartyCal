import { SetBox } from "~/components/SetShared";
import { useLocation } from "@solidjs/router";
import { createResource, Suspense, Show, createMemo } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import Spinner from "~/components/Spinner";

type CreateStateProps = null | {
  s?: number;
  c?: number;
  t?: string;
  k?: boolean;
};

export default function CreatePage() {
  const location = useLocation();
  const fetchLink = async (source: CreateStateProps) => {
    try {
      if (source.s && source.c && source.t){
        const res = await fetch("https://partycal.site/apix/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(source),
        });
        if (res.ok) return res.json();
      } throw new Error();
    } catch {
      return null;
    }
  };

  const [uid] = createResource(()=>location.state || {}, fetchLink);


  return (
    <SetBox>
      <Suspense fallback={<Spinner />}>
        <Show when={uid()}>{JSON.stringify(uid())}</Show>
      </Suspense>
    </SetBox>
  );
}