import { Link } from "@solidjs/meta";
import type { JSX } from "solid-js";
import { createResource, onMount } from "solid-js";


export function SPage(): JSX.Element {

  onMount(() => {
    const [data] = createResource(
      () => fetch("/apix/s-data.json").then((res) => res.json()),
    );
  });

  return (
    <>
      <Link rel="preload" href="/apix/s-data.json" as="fetch" />
      <h1>Page S</h1>
    </>
  );
}