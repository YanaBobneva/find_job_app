import { auth } from "~/server/auth";
import { EmployerInfo } from "../../_components/employer/EmployerInfo";
import { AddVacancyButton } from "../../_components/vacancy/AddVacancyButton";
import { VacancyList } from "../../_components/vacancy/VacancyList";
import { db } from "~/server/db";

export default async function EmployerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employer = await db.employerProfile.findUnique({
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
  const mode = role === "EMPLOYER";

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <EmployerInfo employer={employer} mode={mode} />
      {mode && employer && <AddVacancyButton />}
      {employer && <VacancyList vacancies={employer?.user?.jobs} />}
    </div>
  );
}
