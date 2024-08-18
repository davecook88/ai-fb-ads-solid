import { createAsync } from "@solidjs/router";
import { FacebookCampaign, getCampaigns } from "~/fb/campaigns";
import { fbStore } from "~/store/fb";
import { Spinner } from "~/components/shared/spinner";
import { createEffect, Show } from "solid-js";
import { isServer } from "solid-js/web";
import { AdSetTable } from "./AdSetTable";

export const AdSetView = () => {
  const { fetchAdSets, loading, selectedCampaign } = fbStore;
  console.log(fbStore.store.campaigns);

  createEffect(() => {
    if (!isServer && selectedCampaign()?.id) {
      console.log("fetching ad sets");
      fetchAdSets(selectedCampaign()?.id as string);
    }
  });

  return (
    <div>
      <h1>AdGroup</h1>
      {/* <Show when={selectedCampaign()} fallback={<p>No campaign selected</p>}>
        {(campaign) => <CampaignDetails campaign={campaign} />}
      </Show> */}
      <Show when={!loading()} fallback={<Spinner />}>
        <div class="flex flex-row justify-center w-full">
          <AdSetTable />
        </div>
      </Show>
    </div>
  );
};
