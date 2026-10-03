import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { Message } from "@/lib/types";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        const contents = messages.map((message: Message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
        }));
        
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents,
        });

        return NextResponse.json({ reply: response.text ?? ""});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate response"},
            { status: 500 },
        );
    }
}