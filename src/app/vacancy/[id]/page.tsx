import { db } from "~/server/db";
import { VacancyInfo } from "../../_components/vacancy/VacancyInfo";
import { auth } from "~/server/auth";

export default async function VacancyPage({
  params,
}: {
  params: { id: string };
}) {
  const vacancy = await db.job.findUnique({
    where: { id: params.id },
    include: { employer: true, applications: true },
  });

  const session = await auth();
  const user = await db.user.findUnique({ where: { id: session?.user?.id } });
  const employer = await db.employerProfile.findFirst({
    where: { userId: session?.user.id },
  });

  if (!vacancy) {
    return <div>Вакансия не найдена</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <VacancyInfo
        vacancy={vacancy}
        role={user?.role}
        employerId={employer?.id}
      />
    </div>
  );
}
