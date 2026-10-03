import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Chat } from "@/app/components/Chat";
import { UserMenu } from "@/app/components/UserMenu";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error} = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <aside className="flex w-64 flex-col border-r">
        <div className="flex-1" /> {/* empty for now — chat list later */}
        <UserMenu email={data.user.email ?? ""} />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <Chat />
      </main>
    </div>
  );
}
