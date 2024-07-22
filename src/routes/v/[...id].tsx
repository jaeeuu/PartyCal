import { useParams } from "@solidjs/router";

export default function SharePage() {
  const params = useParams();
  return <div>User {params.id}</div>;
}