import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { baselineAreaValue } = await request.json();

    const backendResponse = await fetch(
      "http://localhost:3030/distinctiveness",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ baselineAreaValue }), 
      }
    );

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: "Backend request failed" },
        { status: 500 }
      );
    }

    const backendData = await backendResponse.text(); 

    return NextResponse.json(backendData, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
