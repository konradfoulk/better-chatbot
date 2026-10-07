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
        
        const stream = await ai.models.generateContentStream({
            model: "gemini-3.8-flash",
            contents,
        });

        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const text = chunk.text;
                        if (text) {
                            controller.enqueue(encoder.encode(text));
                        }
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });
        
        return new Response(readable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate response"},
            { status: 500 },
        );
    }
}