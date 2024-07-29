import { useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";

export default function ResultPage() {
  const location = useLocation();
  const qu = createMemo(()=>location.query || {id: "none"});
  return <div>User {qu().id}</div>;
}