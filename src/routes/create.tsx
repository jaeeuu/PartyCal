import { SetBox } from "~/components/SetShared";
import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, createResource, Suspense, Show, createSignal } from "solid-js";
import Spinner from "~/components/Spinner";


export default function CreatePage() {
  const { state } = useLocation<{start?: number, end?: number, title?: string, anon?:boolean}>();
  const [error, setError] = createSignal(false);
  const navigate = useNavigate();
  let count = 0;

  const [uid, {refetch}] = createResource(async () => {
    try {
      if (!state) throw Error();
      const res = await fetch("https://api.partycal.site/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }); //.then((res) => res.json());
      return res.json();
    } catch {
      return Promise.reject();
    }
  });

  createEffect(() => {
    if (uid.error) {
      if (count < 4){
        refetch();
        count++;
      } else {
        navigate("/");
      }
    }
  });

  return (
    <SetBox>
      <Suspense fallback={<Spinner />}>
        <div></div>
        <Show when={uid()}>{JSON.stringify(uid())}</Show>
      </Suspense>
    </SetBox>
  );
}