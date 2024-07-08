import { useNavigate } from '@solidjs/router';

export default function HomeNewButton() {
  const navigate = useNavigate();
  return (
    <button onClick={()=>navigate("/new")}>
      날짜 투표 만들기
    </button>
  );
}