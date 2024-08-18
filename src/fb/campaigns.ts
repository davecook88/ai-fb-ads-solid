import { getFbAdsSdk } from "./init";

export interface FacebookCampaign {
    id: string;
    name: string;
    status: string;
    objective: string;
    updated_time: string;
}

export const getCampaigns = async (): Promise<FacebookCampaign[]> => {
    "use server"
    const fbAdsSdk = getFbAdsSdk();
    fbAdsSdk.FacebookAdsApi.init(process.env.FB_ACCESS_TOKEN as string);

    const adAccount = new fbAdsSdk.AdAccount(process.env.FB_AD_ACCOUNT_ID);
    const campaigns = await adAccount.getCampaigns([
        fbAdsSdk.Campaign.Fields.name,
        fbAdsSdk.Campaign.Fields.status,
        fbAdsSdk.Campaign.Fields.objective,
        fbAdsSdk.Campaign.Fields.updated_time
    ]);

    return campaigns.map((campaign) => ({
        ...campaign._data

    }));
}
