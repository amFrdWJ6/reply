"use server";

import { signIn, signOut } from "@/auth";

export async function handleSignIn() {
  return await signIn("github");
}

export async function handleSignOut() {
  return await signOut();
}
