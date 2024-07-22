import { useParams } from "@solidjs/router";

export default function ResultPage() {
  const params = useParams();
  return <div>User {params.id}</div>;
}