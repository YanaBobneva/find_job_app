import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { Navbar } from "./navbar";
import { db } from "~/server/db";
import SigninLink from "./signlink";

export async function MyApp({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const employer = await db.employerProfile.findFirst({
    where: { userId: session?.user.id },
  });
  const seeker = await db.seekerProfile.findFirst({
    where: { userId: session?.user.id },
  });

  return (
    <HydrateClient>
      <header>
        {session ? (
          <Navbar
            session={session}
            employerId={employer?.id}
            seekerId={seeker?.id}
          />
        ) : (
          <SigninLink />
        )}
      </header>
      <main>{session ? children : ""}</main>
    </HydrateClient>
  );
}
