import * as stylex from '@stylexjs/stylex';
import { Meta, MetaProvider } from "@solidjs/meta";
import { SetRootBox } from "~/components/SetShared";

const ixStyle = stylex.create({
  base: {

  },
});

export default function New() {
  
  return (
    <SetRootBox>
      <MetaProvider>
        <Meta property="og:url" content="https://party-cal.vercel.app/" />
        <Meta property="og:title" content="PARTYCAL: 일정 투표 플랫폼" />
        <Meta property="og:description" content="친구들과 함께 일정 투표를 시작해보세요" />
        <Meta property="og:image" content="https://jjreset.github.io/act_cdn/shareurl.png" />
      </MetaProvider>
      <div>
        <div>일정 투표 시작 날짜를 선택하세요</div>
        <div>최대 31일을 선택할 수 있어요</div>
      </div>
    </SetRootBox>
  );
}