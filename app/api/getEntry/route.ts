import getCollection from "@/db";
import { Collection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

let cachedCollection: Collection | null = null;

export async function GET(request: NextRequest) {
	const key = request.nextUrl.searchParams.get("key");

	// handle missing key
	if (!key) {
		return NextResponse.json({ error: "Missing key" }, { status: 400 });
	}

	// connect to the database
	if (!cachedCollection) {
		cachedCollection = await getCollection("entries");
	}
	const entryCollection = cachedCollection;

	// get the value from the database
	const entry = await entryCollection.findOne({ key });

	// handle missing entry
	if (!entry) {
		return NextResponse.json({ error: "Entry not found" }, { status: 404 });
	}

	return NextResponse.json({ value: entry.value });
}
