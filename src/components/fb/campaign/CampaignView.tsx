import { createAsync } from "@solidjs/router";
import { FacebookCampaign, getCampaigns } from "~/fb/campaigns";
import CampaignTable from "./CampaignTable";
import { fbStore } from "~/store/fb";
import { Spinner } from "~/components/shared/spinner";
import { CampaignDetails } from "./CampaignDetails";
import { createEffect, Show } from "solid-js";
import { isServer } from "solid-js/web";

export const CampaignView = () => {
  const { fetchCampaigns, loading, selectedCampaign } = fbStore;
  console.log(fbStore.store.campaigns);

  createEffect(() => {
    if (!isServer) {
      console.log("fetching campaigns");
      fetchCampaigns();
    }
  });

  createEffect(() => {
    console.log("selected campaign changed", selectedCampaign());
  });

  return (
    <div class="flex flex-col justify-center w-full">
      <h1>Campaign View</h1>
      <Show when={selectedCampaign()} fallback={<p>No campaign selected</p>}>
        {(campaign) => <CampaignDetails campaign={campaign} />}
      </Show>
      <Show when={!loading()} fallback={<Spinner />}>
        <div class="flex flex-row justify-center w-full">
          <CampaignTable />
        </div>
      </Show>
    </div>
  );
};
