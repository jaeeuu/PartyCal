import { useSearchParams } from "@solidjs/router";

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  return <div>User {searchParams.id || "none"}</div>;
}