import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { Navbar } from "./navbar";
import { SigninLink } from "./signlink";

export async function MyApp({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <HydrateClient>
      <header>{session ? <Navbar session={session} /> : <SigninLink />}</header>
      <main>{session ? children : "Not signed in"}</main>
    </HydrateClient>
  );
}
