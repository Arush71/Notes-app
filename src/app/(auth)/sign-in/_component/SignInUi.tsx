"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Loader } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGuestSignIn } from "~/hooks/use-guest-signin";

const SignInUi = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const { signInAsGuest, isPending: guestPending } = useGuestSignIn();

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            toast.success("Signed in successfully!");
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
            <h1 className="mb-1 text-xl font-semibold">Sign In to Notly</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
                id="email"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-sm">
                  Password
                </Label>
                <Button asChild variant="link" size="sm">
                  <Link
                    href="#"
                    className="link intent-info variant-ghost text-sm"
                  >
                    Forgot your Password ?
                  </Link>
                </Button>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="pwd"
                id="pwd"
                className="input sz-md variant-mixed"
              />
            </div>

            <Button
              type="button"
              className="w-full cursor-pointer"
              onClick={signInWithEmail}
              disabled={emailPending}
            >
              {emailPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>Sign In</>
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
              Want to explore first? Continue as guest for full access to notes.
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
            Don&apos;t have an account ?
            <Button asChild variant="link" className="px-2">
              <Link href="/sign-up">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignInUi;
