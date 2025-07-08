import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { area } = await request.json();

    const backendResponse = await fetch(
      "http://localhost:3030/baselineScore",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ area }), 
      }
    );

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: "Backend request failed" },
        { status: 500 }
      );
    }

     const data = await backendResponse.json();

     const { baselineScore } = data;

    return NextResponse.json({baselineScore}, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
