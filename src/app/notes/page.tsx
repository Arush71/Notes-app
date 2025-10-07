import { auth } from "~/lib/auth";
import { NotesMain } from "./_components/Notes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAllNotes } from "../data/notes/getAllNotes";
import { getQueryClient } from "~/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/sign-in");

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: async () => await getAllNotes(session.user.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <NotesMain userId={session.user.id} initialNotes={notes} /> */}
      <NotesMain userId={session.user.id} />
    </HydrationBoundary>
  );
}
