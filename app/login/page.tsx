"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const router = useRouter();
    
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const supabase = createClient();

            const { error: authError } = isSignUp
                ? await supabase.auth.signUp({ email, password })
                : await supabase.auth.signInWithPassword({ email, password });
            
            if (authError) {
                setError(authError.message);
                return;
            }

            router.push("/");
            router.refresh();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="flex w-80 flex-col gap-3">
                <h1 className="text-2xl font-semibold">
                    {isSignUp ? "Sign Up" : "Login"}
                </h1>

                <input type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 className="rounded-md border border-gray-300 p-2"
                 />

                <input type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 className="rounded-md border border-gray-300 p-2"
                 />

                 {error && <p className="text-sm text-red-500">{error}</p>}
                 
                 <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
                >
                    {loading ? "Working..." : isSignUp ? "Sign up" : "Sign in"}
                </button>

                <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm underline"
                >
                    {isSignUp ? "Have an account? Sign in" : "Need an account? Sign up"}
                </button>
            </form>
        </div>
    )
}