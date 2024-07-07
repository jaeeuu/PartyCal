import { useNavigate } from '@solidjs/router';

export default function HomeNewButton(props) {
  const navigate = useNavigate();
  return (
    <button {...props.componentStyle} onClick={()=>navigate("/new")}>
      날짜 투표 만들기
    </button>
  );
}