import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { broadHabitat, habitatType } = await request.json();

    const response = await fetch("http://localhost:3030/distinctivenessScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        broadHabitat: broadHabitat,
        habitatType: habitatType,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    const { distinctivenessCategory, distinctivenessScore } = data;

    return NextResponse.json(
      { distinctivenessCategory, distinctivenessScore },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}