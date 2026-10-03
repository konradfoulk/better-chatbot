"use client";

import { useState } from "react";
import { Message } from "@/lib/types";

export function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSend(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        setInput("");
        setLoading(true);

        const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];

        setMessages(newMessages);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.error ?? "Something went wrong" },
                ]);
                return;
            }

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex w-full max-w-xl flex-col gap-3">
          <div className="flex min-h-64 flex-col gap-2 overflow-y-auto rounded border p-3">
            {messages.map((message, index) => (
              <p key={index} className={message.role === "user" ? "text-right" : "text-left"}>
                <span className="text-xs text-zinc-500">{message.role}</span>
                <br />
                {message.content}
              </p>
            ))}
          </div>
      
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 rounded border px-3 py-2"
              placeholder="Say something..."
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
    );
}