import { useParams } from '@solidjs/router';

export default function share() {
  const params = useParams();
  return (
    <div>
      <h1>Share {params.id}</h1>
    </div>
  );
}