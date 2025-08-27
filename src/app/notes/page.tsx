import { auth } from "~/lib/auth";
import { NotesMain } from "./_components/Notes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/sign-in");
  }
  return (
    <main className="h-screen">
      <div className="flex h-full">
        <NotesMain />
      </div>
    </main>
  );
}
