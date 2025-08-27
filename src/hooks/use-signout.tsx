"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "~/lib/auth-client";

export function useSignout() {
  const router = useRouter();
  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully!");
        },
        onError: () => {
          toast.error("Error in signing out");
        },
      },
    });
  };
  return handleSignOut;
}
