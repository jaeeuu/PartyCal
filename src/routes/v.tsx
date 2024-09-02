import { useSearchParams } from "@solidjs/router";

// navigator.userAgent.includes('KAKAOTALK')

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  return <div>User {searchParams.id || "none"}</div>;
}