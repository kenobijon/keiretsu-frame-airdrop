import { Metadata } from "next";

const POST_URL = "https://keiretsu-frame-airdrop.vercel.app/api/frame";
const IMG_URL = "https://ibb.co/q11MX3j";

console.log("posturl", POST_URL);
const frameMetadata = {
  "fc:frame": "vNext",
  "fc:frame:image": IMG_URL,
  "fc:frame:button:1": "5 M",
  "fc:frame:button:2": "25 M",
  "fc:frame:button:3": "52 M",
  "fc:frame:button:4": "74 M",
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
