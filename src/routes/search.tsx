import { useSearchParams } from "@solidjs/router";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  return <div>User {searchParams.m || 'none'}</div>;
}