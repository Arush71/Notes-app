import React from "react";
import SignUpUi from "./_component/SignUpUi";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";

const SignUp = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return redirect("/notes");
  }
  return (
    <div>
      <SignUpUi />
    </div>
  );
};

export default SignUp;
