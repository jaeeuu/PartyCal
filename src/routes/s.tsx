import { useSearchParams } from "@solidjs/router";

export default function VotePage() {
  const [searchParams] = useSearchParams();
  return <div>NOT READY YET {searchParams.id || "none"}</div>;
}