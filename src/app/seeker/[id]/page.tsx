import SeekerInfo from "~/app/_components/seeker/SeekerInfo";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function SeekerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const seeker = await db.seekerProfile.findUnique({
    where: { id: (await params).id },
    include: {
      user: {
        include: {
          jobs: true,
        },
      },
    },
  });

  const session = await auth();
  const role = session?.user.role;
  const mode = role === "SEEKER" && seeker?.userId === session?.user.id;

  return <SeekerInfo seeker={seeker} mode={mode} role={role} />;
}
