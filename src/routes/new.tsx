import * as stylex from '@stylexjs/stylex';
import { Meta, MetaProvider } from "@solidjs/meta";
import { SetRootBox } from "~/components/SetShared";
import { createSignal, Show } from "solid-js";
import { oneDate } from '~/common/store';
import type { Dayjs } from "dayjs";
import SetSubPage from '~/components/SetSubPage';

const ixStyle = stylex.create({
  base: {

  },
});

export default function New() {
  const [toDate, setToDate] = createSignal<Dayjs>(oneDate.clone());
  const [dateRange, setDateRange] = createSignal([null, null]);
  const [showSub, setShowSub] = createSignal(0);
  
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
      <div>
        <div>
          <Show when={!isNaN(dateRange()[0])}><div>시작일을 선택하세요</div></Show>
          <Show when={isNaN(dateRange()[0])}><div>{dateRange()[0].format("YYYY[년] MM[월] DD[일]")}</div></Show>
        </div>
        <div>
          <Show when={!isNaN(dateRange()[1])}><div>종료일을 선택하세요</div></Show>
          <Show when={isNaN(dateRange()[1])}>{dateRange()[1].format("YYYY[년] MM[월] DD[일]")}</Show>
        </div>
        <div>익명 투표</div>
      </div>
      <SetSubPage show={showSub} setShow={setShowSub}>
        <div>

        </div>
      </SetSubPage>
    </SetRootBox>
  );
}