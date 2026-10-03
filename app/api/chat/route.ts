import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: message,
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