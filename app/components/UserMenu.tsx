"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function UserMenu({ email }: { email: string }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    async function handleSignOut() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div ref={menuRef} className="relative border-t p-2">
          {open && (
            <div className="absolute bottom-full left-2 right-2 mb-1 rounded border p-1 shadow">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full rounded px-3 py-2 text-left text-sm hover:border"
              >
                Log out
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full truncate rounded px-3 py-2 text-left text-sm hover:border"
          >
            {email}
          </button>
        </div>
      );
}