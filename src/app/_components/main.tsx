import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { Navbar } from "./navbar";
import { db } from "~/server/db";
import SigninLink from "./signlink";
import { api } from "~/trpc/react";

export async function MyApp({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <HydrateClient>
      <header>{session ? <Navbar session={session} /> : <SigninLink />}</header>
      <main>{session ? children : ""}</main>
    </HydrateClient>
  );
}
