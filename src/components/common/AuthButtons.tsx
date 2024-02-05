"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { LoadingIcon, LoginIcon, LogoutIcon } from "../icons/svg";
import { handleSignIn, handleSignOut } from "@/lib/actions";

export function SignIn() {
  const [_, formAction] = useFormState(handleSignIn, null);
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <form action={formAction}>
      <button
        type="submit"
        title="Sign In with GitHub"
        onClick={() => {
          setLoading(true);
        }}
      >
        {isLoading ? <LoadingIcon /> : <LoginIcon />}
      </button>
    </form>
  );
}

export function SignOut() {
  const [_, formAction] = useFormState(handleSignOut, null);
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <form action={formAction} className="w-full">
      <button
        type="submit"
        title="Sign Out"
        onClick={() => {
          setLoading(true);
        }}
      >
        {isLoading ? <LoadingIcon /> : <LogoutIcon />}
      </button>
    </form>
  );
}
