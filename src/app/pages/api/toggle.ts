import type { NextApiRequest, NextApiResponse } from "next";
import { getSSLHubRpcClient, Message } from "@farcaster/hub-nodejs";

const HUB_URL = process.env["HUB_URL"];
const client = HUB_URL ? getSSLHubRpcClient(HUB_URL) : undefined;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process the vote
    // For example, let's assume you receive an option in the body

    console.log({ requestBody: req.body });
    try {
      const pollId = req.query["id"];
      const results = req.query["results"] === "true";
      let voted = req.query["voted"] === "true";
      if (!pollId) {
        return res.status(400).send("Missing poll ID");
      }

      return res.status(200).send("OK");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating image");
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
