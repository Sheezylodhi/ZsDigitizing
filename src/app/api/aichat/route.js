import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages?.[messages.length - 1]?.content;

    if (!lastMessage) {
      return NextResponse.json(
        { reply: "No message received" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: lastMessage }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("GROQ ERROR:", data);
      return NextResponse.json(
        { reply: data?.error?.message || "Groq error" },
        { status: 500 }
      );
    }

    const reply = data?.choices?.[0]?.message?.content;

    return NextResponse.json({ reply: reply || "No reply" });

  } catch (err) {
    console.log("SERVER ERROR:", err);

    return NextResponse.json(
      { reply: "Server error" },
      { status: 500 }
    );
  }
}