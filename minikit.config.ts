const ROOT_URL = "https://basepostingbadge.vercel.app";
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
   "accountAssociation": {
        "header": "eyJmaWQiOjU3NjA2MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDRiZEUyNjkxYTRhOTg3OWQ3NjUxMjQwN0FjNmFlOThFZDU5ZTdkQzMifQ",
    "payload": "eyJkb21haW4iOiJiYXNlcG9zdGluZ2JhZGdlLnZlcmNlbC5hcHAifQ",
    "signature": "+gIZ3SZyxVALZqirLEGDryMg80P034WsvACMU7nq6vlQlrwOBJMDmVbDrOF6dQmDAzSlsk/1W+Cu7vAEPV4PYxw="
  },

  baseBuilder: {
    ownerAddress: "0x896A2C346B7883FCb77B33BA8d2DDC7718803239",
  },
  miniapp: {
    version: "1",
    subtitle: "A badge for Baseposters Pros",
    description: "a medal for the best baseposters",
    screenshotUrls: ["https://basepostingbadge.vercel.app/images/scr1.png"],
    name: "Baseposting badge Mint",
    iconUrl: `https://basepostingbadge.vercel.app/images/icon.png`,
    splashImageUrl: `https://basepostingbadge.vercel.app/images/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: "https://basepostingbadge.vercel.app",
    webhookUrl: "https://basepostingbadge.vercel.app/api/webhook",
    primaryCategory: "art-creativity",
    tags: ["Art","NFT","Badge"],
    heroImageUrl: "https://basepostingbadge.vercel.app/images/heroog.png",
    tagline: "",
    ogTitle: "Baseposting Badge NFT",
    ogDescription: "a medal for the best baseposters",
    ogImageUrl: "https://basepostingbadge.vercel.app/images/heroog.png",
  },
} as const;
