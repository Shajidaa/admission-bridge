import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const budget = searchParams.get("budget") || 50000;
  const country = searchParams.get("country");
  const degree = searchParams.get("degree");

  try {
    let query = `SELECT * FROM universities WHERE tuition_fee <= $1`;
    let values = [budget];
    let paramCount = 1;

    if (country && country !== "All") {
      paramCount++;
      query += ` AND country = $${paramCount}`;
      values.push(country);
    }

    if (degree && degree !== "All") {
      paramCount++;
      query += ` AND degree_level = $${paramCount}`;
      values.push(degree);
    }

    query += ` ORDER BY tuition_fee ASC`;

    const result = await db.query(query, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
