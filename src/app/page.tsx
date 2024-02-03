import { Metadata } from "next";
import React, { useEffect } from "react";

const POST_URL = "https://keiretsu-frame-airdrop.vercel.app/api/frame";
const IMG_URL = "https://keiretsu-frame-airdrop.vercel.app/crypto-q.png";

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

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "https://stand.org",
      permanent: false, // Use `true` for a 301 redirect or `false` for a 302 redirect
    },
  };
}

export default function Home() {
  // useEffect(() => {
  //   // Redirect to "stand.org"
  //   window.location.href = "https://stand.org";
  // }, []); // Empty dependency array means this effect runs once on mount
  // return null; // Render nothing since we're redirecting
}
