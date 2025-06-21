// write Get API endpoint to fetch players using balldontlie/sdk
import { NextResponse } from "next/server";

import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey: process.env.BALLDONTLIE_API_KEY });

const Get = async (req: Request) => {
  console.log("Received request to fetch players");
  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit");
    const offset = url.searchParams.get("offset") || "0";

    // Fetch players with pagination
    const response = await api.nba.getPlayers({
      cursor: Number(offset),
      per_page: Number(limit) || 10,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
};

export { Get as GET };
