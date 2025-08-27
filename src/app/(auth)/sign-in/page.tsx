import SignInUi from "./_component/SignInUi";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";

const SignIn = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return redirect("/notes");
  }
  return (
    <div>
      <SignInUi />
    </div>
  );
};

export default SignIn;
