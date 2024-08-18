import { FacebookCampaign } from "~/fb/campaigns";

export const CampaignDetails = ({
  campaign,
}: {
  campaign: () => FacebookCampaign | null;
}) => {
  if (!campaign || !campaign()) {
    return null;
  }

  return (
    <div>
      <h1>Campaign Details</h1>
      <h2>{campaign()?.name}</h2>
      <p>{campaign()?.id}</p>
    </div>
  );
};
