"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";

interface Response {
  id: number;
  name: string;
  resumeLink: string;
}

interface Vacancy {
  id: number;
  title: string;
  description: string;
  responses: Response[];
}

export default function EmployerPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([
    {
      id: 1,
      title: "Frontend Developer",
      description: "Требуется опытный разработчик React.",
      responses: [
        { id: 1, name: "Анна Иванова", resumeLink: "/resumes/anna.pdf" },
        { id: 2, name: "Игорь Смирнов", resumeLink: "/resumes/igor.pdf" },
      ],
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Опыт работы с Node.js и PostgreSQL.",
      responses: [],
    },
  ]);

  const handleCreateVacancy = () => {
    alert("Переход к созданию вакансии");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      {/* Инфо о компании */}
      <div className="rounded-box bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-cyan-800">
          ООО "Tech Solutions"
        </h1>
        <p className="mb-1 text-cyan-900">
          Мы создаем современные цифровые продукты для бизнеса и пользователей.
        </p>
        <p className="text-sm text-cyan-700">
          Контакты:{" "}
          <a href="mailto:info@techsolutions.ru" className="underline">
            info@techsolutions.ru
          </a>{" "}
          | +7 (999) 123-45-67
        </p>
      </div>

      {/* Кнопка */}
      <div className="flex justify-end">
        <button
          className="btn bg-cyan-500 text-white shadow-md hover:bg-cyan-600"
          onClick={handleCreateVacancy}
        >
          <CirclePlus />
          Создать вакансию
        </button>
      </div>

      {/* Вакансии */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-cyan-800">
          Список вакансий
        </h2>
        {vacancies.map((vacancy) => (
          <div
            key={vacancy.id}
            className="collapse-arrow rounded-box collapse border border-cyan-300 bg-white shadow-sm"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium text-cyan-700">
              {vacancy.title}
            </div>
            <div className="collapse-content space-y-2 text-cyan-900">
              <p>{vacancy.description}</p>
              <div className="divider before:bg-cyan-300 after:bg-cyan-300">
                Отклики
              </div>
              {vacancy.responses.length > 0 ? (
                <ul className="list-inside list-disc">
                  {vacancy.responses.map((res) => (
                    <li key={res.id}>
                      {res.name} —{" "}
                      <a
                        href={res.resumeLink}
                        className="link text-cyan-600 hover:text-cyan-800"
                        target="_blank"
                      >
                        Резюме
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-cyan-600">Откликов пока нет</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
