import { useSearchParams } from "@solidjs/router";

export default function VotePage() {
  const [searchParams] = useSearchParams();
  return <div>User {searchParams.id || "none"}</div>;
}