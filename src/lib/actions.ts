"use server";

import { signIn, signOut } from "@/auth";

// Auth
export async function handleSignIn() {
  return await signIn("github");
}

export async function handleSignOut() {
  return await signOut();
}
