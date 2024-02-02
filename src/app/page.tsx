import { Metadata } from "next";

const POST_URL = "https://frame-airdrop.vercel.app/api/frame";
const IMG_URL =
  "https://i.seadn.io/s/raw/files/f3c250a8605f6ba20c91569f77e21a33.png?auto=format&dpr=1&w=3840";

console.log("posturl", POST_URL);
const frameMetadata = {
  "fc:frame": "vNext",
  "fc:frame:image": IMG_URL,
  "fc:frame:button:1": "$ETH",
  "fc:frame:button:2": "$BTC",
  "fc:frame:post_url": POST_URL,
};

export const metadata: Metadata = {
  title: "Stand With Crypto!",
  description: "Generated by Ken",
  openGraph: {
    title: "Stand w/ Crypto Airdrop",
    images: [IMG_URL],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <>
      <main>Frame Airdrop!</main>
    </>
  );
}
