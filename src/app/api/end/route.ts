import { NextRequest, NextResponse } from "next/server";
import { Message, getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import { FrameRequest } from "../../types/farcasterTypes";

const POST_URL = "https://keiretsu-frame-airdrop.vercel.app/api/end";
const VISIT_URL = "https://keiretsu-frame-airdrop.vercel.app/api/frame";
const TOGGLE_URL = "https://keiretsu-frame-airdrop.vercel.app/api/toggle";
const Q2_URL = "https://keiretsu-frame-airdrop.vercel.app/api/q2";
const Q3_URL = "https://keiretsu-frame-airdrop.vercel.app/api/end";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("POST received at /api/frame");

  const HUB_URL = process.env["HUB_URL"] || "nemes.farcaster.xyz:2283";
  const client = getSSLHubRpcClient(HUB_URL);
  let validatedMessage: Message | undefined = undefined;
  try {
    const body: FrameRequest = await req.json();
    console.log(body);
    const frameMessage = Message.decode(
      Buffer.from(body?.trustedData?.messageBytes || "", "hex")
    );
    const result = await client.validateMessage(frameMessage);
    if (result.isOk() && result.value.valid) {
      validatedMessage = result.value.message;
    }

    // Also validate the frame url matches the expected url
    let urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
    const urlString = Buffer.from(urlBuffer).toString("utf-8");
    if (!urlString.startsWith(process.env["HOST"] || "")) {
      throw new Error(`Invalid frame url: ${urlBuffer}`);
    }
  } catch (e) {
    throw new Error(`Failed to validate message: ${e}`);
  }

  console.log(validatedMessage);

  const buttonId = validatedMessage?.data?.frameActionBody?.buttonIndex || 0;
  const fid = validatedMessage?.data?.fid || 0;

  const INCORRECT_IMAGE_URL =
    "https://t4.ftcdn.net/jpg/03/87/37/09/360_F_387370928_uxePPpjy9FtcCCU3oTjHbPsKjl36mOaX.jpg";

  const IMG_URL = "https://keiretsu-frame-airdrop.vercel.app/stand.jpeg";

  //   // If buttonId is 1, redirect to the external website
  //   if (buttonId === 2) {
  //     // return NextResponse.redirect("https://www.standwithcrypto.org/");
  //     return new Response(null, {
  //       status: 302,
  //       headers: {
  //         Location: "https://www.standwithcrypto.org/",
  //       },
  //     });
  //   }

  let html =
    `<!DOCTYPE html><html><head>` +
    `<meta property="fc:frame" content="vNext" />` +
    `<meta property="fc:frame:image" content="${IMG_URL}" />` +
    `<meta property="fc:frame:button:2" content="Go to Stand With Crypto" />` +
    `<meta property="fc:frame:post_url" content="${POST_URL}" />` +
    `</head></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}

export const dynamic = "force-dynamic";
