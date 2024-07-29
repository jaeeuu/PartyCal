import { useParams } from "@solidjs/router";

export default function VotePage() {
  const params = useParams();
  return <div>User {params.id}</div>;
}