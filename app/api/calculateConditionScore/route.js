import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { broadHabitat, habitatType, condition } = await request.json();
    console.log("In route conditionScore condition: " + condition);
    console.log("In route conditionScore habitat type: " + habitatType);
        console.log("In route conditionScore broad habitat: " + broadHabitat);


    const response = await fetch("http://localhost:3030/conditionScore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        condition: condition,
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

    const { conditionScore } = data;

    return NextResponse.json({ conditionScore }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}