import { AdSetView } from "~/components/fb/ad-set/AdSetView";
import { CampaignView } from "~/components/fb/campaign/CampaignView";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        AI Facebook Ads
      </h1>
      <div class="grid md:grid-cols-2 gap-4 mx-auto">
        <CampaignView />
        <AdSetView />
      </div>
    </main>
  );
}
