import { createSignal, createRoot, createMemo, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { getAdSets } from "~/fb/ad-sets";
import { FacebookAdSet } from "~/fb/ad-sets";
import { FacebookCampaign, getCampaigns } from "~/fb/campaigns";

const createFbStore = () => {
    const [store, setStore] = createStore<{
        selectedCampaignId: string | null;
        campaigns: FacebookCampaign[];
        adSets: FacebookAdSet[];
        selectedAdSetId: string | null;
    }>({
        selectedCampaignId: null,
        campaigns: [],
        adSets: [],
        selectedAdSetId: null,
    });

    const [loading, setLoading] = createSignal(false);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const fetchedCampaigns = await getCampaigns();
            console.log("fetched campaigns", fetchedCampaigns);
            setStore("campaigns", fetchedCampaigns);
        } catch (error) {
            console.error("Failed to fetch campaigns:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdSets = async (campaignId: string) => {
        if (!campaignId) {
            console.error("No campaign id provided");
            return;
        }
        setLoading(true);
        try {
            const fetchedAdSets = await getAdSets(campaignId);
            console.log("fetched ad sets", fetchedAdSets);
            setStore("adSets", fetchedAdSets);
        } catch (error) {
            console.error("Failed to fetch ad sets:", error);
        } finally {
            setLoading(false);
        }
    }

    const selectCampaign = (campaignId: string) => {
        setStore("selectedCampaignId", campaignId);
    }

    const selectedCampaign = createMemo(() => {
        const campaign = store.campaigns.find((campaign) => campaign.id === store.selectedCampaignId);
        return campaign ?? null;
    });

    const selectAdSet = (adSetId: string) => {
        setStore("selectedAdSetId", adSetId);
    }

    const selectedAdSet = createMemo(() => {
        const adSet = store.adSets.find((adSet) => adSet.id === store.selectedAdSetId);
        return adSet ?? null;
    });

    return {
        store,
        setStore,
        loading,
        fetchCampaigns,
        selectCampaign,
        selectedCampaign,
        fetchAdSets,
        selectAdSet,
        selectedAdSet
    };
}

export const fbStore = createRoot(createFbStore)