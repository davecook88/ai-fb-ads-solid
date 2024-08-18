import _fbAdsSdk from 'facebook-nodejs-business-sdk';

export const getFbAdsSdk = () => {
    "use server"
    const fbAdsSdk = _fbAdsSdk;

    fbAdsSdk.FacebookAdsApi.init(process.env.FB_ACCESS_TOKEN as string);
    return fbAdsSdk;
}

