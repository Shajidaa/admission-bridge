import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const budget = searchParams.get("budget") || 50000;
  const country = searchParams.get("country");

  try {
    let query = `SELECT * FROM universities WHERE tuition_fee <= $1`;
    let values = [budget];

    if (country && country !== "All") {
      query += ` AND country = $2`;
      values.push(country);
    }

    const result = await db.query(query, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
