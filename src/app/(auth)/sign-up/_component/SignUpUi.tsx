"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { useState, useTransition } from "react";
import { authClient } from "~/lib/auth-client";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGuestSignIn } from "~/hooks/use-guest-signin";

const SignUpUi = () => {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const { signInAsGuest, isPending: guestPending } = useGuestSignIn();

  function signUpWithEmail() {
    startEmailTransition(async () => {
      await authClient.signUp.email(
        {
          email,
          password,
          name: fullname,
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully!");
            router.push("/notes");
          },
          onError: (error) => {
            toast.error(`${error.error.message}`);
          },
        },
      );
    });
  }
  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8">
          <div className="text-center">
            <h1 className="mb-1 text-xl font-semibold">
              Create a Notly Account
            </h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="firstname" className="block text-sm">
                  Fullname
                </Label>
                <Input
                  type="text"
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                  required
                  name="firstname"
                  id="firstname"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                name="email"
                id="email"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center">
                <Label htmlFor="pwd" className="text-sm">
                  Password
                </Label>
              </div>
              <Input
                type="password"
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <Button
              type="button"
              onClick={signUpWithEmail}
              disabled={emailPending}
              className="w-full cursor-pointer"
            >
              {emailPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>Sign Up</>
              )}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-zinc-400">or</span>
              </div>
            </div>
            <p className="text-center text-xs text-zinc-400">
              Just want to try it? Continue as guest and use all note features.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="w-full cursor-pointer"
              onClick={signInAsGuest}
              disabled={guestPending || emailPending}
            >
              {guestPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Starting guest session...</span>
                </>
              ) : (
                <>Continue as Guest</>
              )}
            </Button>
          </div>

        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUpUi;
