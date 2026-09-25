import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";


export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error} = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">You're in</h1>
      <p className="text-zinc-600">{data.user.email}</p>
    </main>
  );
}
