import { Targeting } from "facebook-nodejs-business-sdk";
import { getFbAdsSdk } from "./init";

export interface FacebookAdSet {
    name: string
    status: string
    daily_budget?: string
    lifetime_budget?: string
    billing_event: string
    optimization_goal: string
    targeting: Targeting
    updated_time: string
    id: string
}

export const getAdSets = async (campaignId: string): Promise<FacebookAdSet[]> => {
    "use server"
    const fbAdsSdk = getFbAdsSdk();
    fbAdsSdk.FacebookAdsApi.init(process.env.FB_ACCESS_TOKEN as string);

    const adAccount = new fbAdsSdk.AdAccount(process.env.FB_AD_ACCOUNT_ID);
    const adSets = await adAccount.getAdSets([
        fbAdsSdk.AdSet.Fields.name,
        fbAdsSdk.AdSet.Fields.status,
        fbAdsSdk.AdSet.Fields.daily_budget,
        fbAdsSdk.AdSet.Fields.lifetime_budget,
        fbAdsSdk.AdSet.Fields.billing_event,
        fbAdsSdk.AdSet.Fields.optimization_goal,
        fbAdsSdk.AdSet.Fields.targeting,
        fbAdsSdk.AdSet.Fields.targeting_optimization_types,
        fbAdsSdk.AdSet.Fields.updated_time
    ], {
        campaign_id: campaignId
    });

    console.log("adSets", JSON.stringify(adSets.map(a => a._data)));

    return adSets.map((set) => ({
        ...set._data
    }));
}
