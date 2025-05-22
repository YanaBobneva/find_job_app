import Link from "next/link";

type Vacancy = {
  id: string;
  title: string;
};

type VacancyListProps = {
  vacancies: Vacancy[] | undefined;
};

export const VacancyList = ({ vacancies }: VacancyListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-cyan-800">Список вакансий</h2>
      {vacancies?.length === 0 ? (
        <div>У вас пока нет вакансий.</div>
      ) : (
        vacancies?.map((vacancy) => (
          <div
            key={vacancy.id}
            className="flex items-center justify-between border-b border-cyan-300 bg-white p-4 shadow-sm"
          >
            <div>
              <Link
                href={`/vacancy/${vacancy.id}`} // Добавляем динамическую ссылку на вакансию
                className="text-lg font-medium text-cyan-700 hover:text-cyan-900"
              >
                {vacancy.title}
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
