import { auth } from "~/server/auth";
import { db } from "~/server/db";
import ChooseRole from "./_components/choose-role/ChooseRole";
import { Filters } from "./_components/filters";
import { ResumeCard } from "./_components/resume/ResumeCard";
import { VacancyCard } from "./_components/vacancy/VacancyCard";
import Pagination from "./_components/pagination";
import SigninLink from "./_components/signlink";
import { redirect } from "next/navigation";

export default async function Home(props: {
  searchParams?: Promise<{
    size?: string;
    page?: string;
    city?: string;
    experience?: string;
    job?: string;
  }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await db.user.findUnique({ where: { id: session?.user?.id } });

  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || 12;

  const city = searchParams?.city ?? "";
  const experience = searchParams?.experience ?? "";
  const job = searchParams?.job ?? "";

  const seekersCount = await db.seekerProfile.count({
    where: {
      location: city ? { contains: city } : undefined,
      education: experience ? { contains: experience } : undefined,
      wish_job: job ? { contains: job } : undefined,
    },
  });

  const seekerProfiles = await db.seekerProfile.findMany({
    where: {
      location: city ? { contains: city } : undefined,
      education: experience ? { contains: experience } : undefined,
      wish_job: job ? { contains: job } : undefined,
    },
    skip: (page - 1) * size,
    take: size,
  });

  const seekerPages = Math.ceil(Number(seekersCount) / size);

  const vacanciesCount = await db.job.count({
    where: {
      location: city ? { contains: city } : undefined,
      experienceLevel: experience ? { contains: experience } : undefined,
      title: job ? { contains: job } : undefined,
    },
  });

  const vacancies = await db.job.findMany({
    where: {
      location: city ? { contains: city } : undefined,
      experienceLevel: experience ? { contains: experience } : undefined,
      title: job ? { contains: job } : undefined,
    },
    skip: (page - 1) * size,
    take: size,
    include: { employer: { include: { employerProfile: true } } },
  });

  const vacanciesPages = Math.ceil(Number(vacanciesCount) / size);

  return user?.role === null ? (
    <ChooseRole user={user} />
  ) : (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-cyan-800">
        {user?.role === "EMPLOYER"
          ? "Список резюме кандидатов"
          : "Список вакансий"}
      </h1>

      <Filters />

      <div className="grid gap-6 md:grid-cols-2">
        {user?.role === "EMPLOYER"
          ? seekerProfiles.map((seeker) => (
              <ResumeCard key={seeker.id} resume={seeker} />
            ))
          : vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
      </div>

      <Pagination
        totalPages={user?.role === "EMPLOYER" ? seekerPages : vacanciesPages}
      />
    </div>
  );
}
