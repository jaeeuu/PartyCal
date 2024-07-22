import type { JSX } from "solid-js";
import { Meta } from "@solidjs/meta";

export default function SetMetaMain(): JSX.Element {
  return (
    <>
      <Meta property="og:url" content="https://party-cal.vercel.app/" />
      <Meta property="og:title" content="PARTYCAL: 일정 투표 플랫폼" />
      <Meta property="og:description" content="친구들과 함께 일정 투표를 시작해보세요" />
      <Meta property="og:image" content="https://jjreset.github.io/act_cdn/shareurl.png" />
    </>
  );
}