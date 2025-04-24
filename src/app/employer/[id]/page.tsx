import { EmployerInfo } from "../../_components/employer/EmployerInfo";
import { AddVacancyButton } from "../../_components/vacancy/AddVacancyButton";
import { VacancyList } from "../../_components/vacancy/VacancyList";
import { db } from "~/server/db";

export default async function EmployerPage({
  params,
}: {
  params: { id: string };
}) {
  const employer = await db.employerProfile.findUnique({
    where: { id: params.id },
    include: {
      user: {
        include: {
          jobs: true,
          applications: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <EmployerInfo employer={employer} />
      <AddVacancyButton />
      <VacancyList vacancies={employer?.user?.jobs} />
    </div>
  );
}
