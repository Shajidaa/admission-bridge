import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      university_id,
      student_name,
      student_email,
      student_gpa,
      student_ielts,
    } = body;

    const uniResult = await db.query(
      "SELECT name, min_gpa, min_ielts FROM universities WHERE id = $1",
      [university_id]
    );
    const uni = uniResult.rows[0];

    if (
      parseFloat(student_gpa) < parseFloat(uni.min_gpa) ||
      parseFloat(student_ielts) < parseFloat(uni.min_ielts)
    ) {
      return NextResponse.json(
        {
          error: `Application Rejected!
A minimum GPA of ${uni.min_gpa} and an IELTS score of ${uni.min_ielts} are required for ${uni.name}.
`,
        },
        { status: 400 }
      );
    }

    await db.query(
      `INSERT INTO applications (university_id, student_name, student_email, student_gpa, student_ielts) 
       VALUES ($1, $2, $3, $4, $5)`,
      [university_id, student_name, student_email, student_gpa, student_ielts]
    );

    return NextResponse.json({
      message:
        "Congratulations!Your application has been successfully submitted. 🎉",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error!Please try again." },
      { status: 500 }
    );
  }
}
