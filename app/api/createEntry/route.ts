import getCollection from "@/db";
import { Entry } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const reqJson = await request.json();
		const entry: Entry = { key: reqJson.key, value: reqJson.value };

		if (!entry.key || !entry.value) {
			return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
		}

		const entryCollection = await getCollection("entries");
		const exists = await entryCollection.findOne({ key: entry.key });

		if (exists) {
			return NextResponse.json({ error: "Key already exists" }, { status: 400 });
		}

		await entryCollection.insertOne(entry);

		return NextResponse.json({ message: "Entry created" }, { status: 201 });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}
}
