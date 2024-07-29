import { useLocation } from "@solidjs/router";

export default function ResultPage() {
  const location = useLocation();
  const qu = location.query;
  return <div>User {qu.id}</div>;
}