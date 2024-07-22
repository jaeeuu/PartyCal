import { SetBox } from "~/components/SetShared";
import { useLocation } from "@solidjs/router";
import { createResource, Suspense, Show, createMemo } from "solid-js";
import Spinner from "~/components/Spinner";

type CreateStateProps = null | {
  start?: number;
  end?: number;
  title?: string;
  anon?: boolean;
};

export default function CreatePage() {
  const location = useLocation();
  const state = createMemo<CreateStateProps>(() => location.state || {});
  const fetchLink = async (source: CreateStateProps) => {
    try {
      if (!source.start || !source.end || !source.title) throw new Error();
      const res = await fetch("https://api.partycal.site/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(source),
      });
      if (res.ok) return res.json();
      else throw new Error();
    } catch {
      return null;
    }
  };

  const [uid] = createResource(()=>state(), fetchLink);

  // const [uid] = createResource(async() => {
  //   try {
  //     if (!state()) throw new Error();
  //     const res = await fetch("https://api.partycal.site/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(state()),
  //     });
  //     if (res.ok) return Promise.resolve(res.json());
  //     else throw new Error();
  //   } catch {
  //     return Promise.resolve(null);
  //   }
  // });

  return (
    <SetBox>
      <Suspense fallback={<Spinner />}>
        <Show when={uid()}>{JSON.stringify(uid())}</Show>
      </Suspense>
    </SetBox>
  );
}