import { auth } from "~/server/auth";
import { db } from "~/server/db";
import ChooseRole from "./_components/choose-role/ChooseRole";
import {
  User,
  MapPin,
  Briefcase,
  Mail,
  Heart,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Filters } from "./_components/filters";
import { ResumeCard } from "./_components/resume/ResumeCard";
import { Pagination } from "./_components/pagination";
import { VacancyCard } from "./_components/vacancy/VacancyCard";

export default async function Home() {
  const session = await auth();
  const user = await db.user.findUnique({ where: { id: session?.user?.id } });

  const resumes = [
    {
      id: "1",
      name: "Анастасия К.",
      wish_job: "UX/UI дизайнер",
      experienceLevel: "2 года",
      location: "Санкт-Петербург",
      email: "anastasia@example.com",
    },
    {
      id: "2",
      name: "Иван П.",
      wish_job: "Фронтенд-разработчик",
      experienceLevel: "3 года",
      location: "Москва",
      email: "ivan@example.com",
    },
  ];

  const vacancies = [
    {
      id: "1",
      title: "Фронтенд-разработчик",
      company: "ООО Рога и Копыта",
      experience: "1-3 года",
      location: "Москва",
      contact: "hr@rogakopyta.ru",
    },
    {
      id: "2",
      title: "UX/UI дизайнер",
      company: "ДизайнСтудия",
      experience: "До года",
      location: "Санкт-Петербург",
      contact: "design@studio.ru",
    },
  ];

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
          ? resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))
          : vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
      </div>

      <Pagination />
    </div>
  );
}
