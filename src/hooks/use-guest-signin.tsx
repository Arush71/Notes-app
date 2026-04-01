"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";

export function useGuestSignIn() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const signInAsGuest = () => {
    startTransition(async () => {
      const guestId = crypto.randomUUID();
      const email = `guest-${guestId}@notly.guest`;
      const password = crypto.randomUUID();

      await authClient.signUp.email(
        { email, password, name: "Guest" },
        {
          onSuccess: () => {
            toast.success("Signed in as guest — enjoy exploring!");
            router.push("/notes");
          },
          onError: (err) => {
            toast.error(`Could not start guest session: ${err.error.message}`);
          },
        },
      );
    });
  };

  return { signInAsGuest, isPending };
}
