"use client";

import {
  Briefcase,
  MapPin,
  Mail,
  User,
  Heart,
  BadgeRussianRuble,
  BookCheck,
  HeartOff,
} from "lucide-react";
import Link from "next/link";
import { useFavoriteVacancy } from "~/hooks/useFavoriteVacancy";
import { useSendApplication } from "~/hooks/useSendApplication";

export function VacancyCard({ vacancy }: { vacancy: any }) {
  const { isFavorite, handleAdd, handleDelete } = useFavoriteVacancy(
    vacancy.id,
  );
  const { sendApplication } = useSendApplication();

  return (
    <div className="card bg-white shadow-md transition-all hover:shadow-lg">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <h2 className="card-title text-cyan-800">
            <Briefcase className="mr-2 h-5 w-5" />
            {vacancy.title}
          </h2>
          {isFavorite ? (
            <button
              className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100"
              onClick={handleDelete}
            >
              <HeartOff className="h-5 w-5" />
            </button>
          ) : (
            <button
              className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100"
              onClick={handleAdd}
            >
              <Heart className="h-5 w-5" />
            </button>
          )}
        </div>

        <p className="flex items-center text-cyan-900">
          <User className="mr-2 h-4 w-4" />
          {vacancy.employer.employerProfile.companyName}
        </p>
        <p className="flex items-center text-cyan-900">
          <MapPin className="mr-2 h-4 w-4" />
          {vacancy.location}
        </p>
        <p className="flex items-center text-cyan-900">
          <BookCheck className="mr-2 h-4 w-4" />
          Требуемый опыт: {vacancy.experienceLevel}
        </p>
        <p className="flex items-center text-cyan-900">
          <BadgeRussianRuble className="mr-2 h-4 w-4" />
          Зарплата: {vacancy.salary} руб
        </p>

        <div className="mt-4 flex justify-between">
          <Link
            href={`/vacancy/${vacancy.id}`}
            className="btn btn-outline btn-sm border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white"
          >
            📄 Подробнее
          </Link>
          <button
            onClick={() =>
              sendApplication(
                vacancy.employer.employerProfile.email,
                vacancy.id,
              )
            }
            className="btn btn-sm bg-cyan-500 text-white hover:bg-cyan-600"
          >
            <Mail className="mr-2 h-4 w-4" /> Откликнуться
          </button>
        </div>
      </div>
    </div>
  );
}
