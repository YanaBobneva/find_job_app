"use client";

import { Pencil, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";
import { EditVacancyModal } from "./EditVacancyModal";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useFavoriteVacancy } from "~/hooks/useFavoriteVacancy";
import { useSendApplication } from "~/hooks/useSendApplication";
import toast from "react-hot-toast";

export function VacancyInfo({
  vacancy,
  role,
  employerId,
  mode,
}: {
  vacancy: any;
  role: any;
  employerId: string | undefined;
  mode: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFavorite, handleAdd, handleDelete } = useFavoriteVacancy(
    vacancy.id,
  );
  const { sendApplication } = useSendApplication();
  const deleteMutation = api.vacancy.deleteVacancy.useMutation();
  const router = useRouter();
  const handleDeleteVacancy = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteMutation.mutateAsync({ jobId: vacancy.id });
      router.push(`/employer/${employerId}`); // редирект после удаления
      toast.success("Вакансия удалена");
    } catch (error) {
      toast.error("При удалении вакансии произошла ошибка");
    }
  };

  return (
    <div>
      <div className="rounded-box relative bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h1 className="text-3xl font-bold text-cyan-800">{vacancy.title}</h1>

          {mode && (
            <div className="flex space-x-4">
              <button
                className="text-cyan-800 hover:text-cyan-600"
                onClick={() => setIsModalOpen(true)}
              >
                <Pencil className="h-6 w-6" />
              </button>
              <button
                className="text-red-600 hover:text-red-500"
                onClick={handleDeleteVacancy}
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          )}
          {role === "SEEKER" && (
            <div className="flex space-x-4">
              <button
                className="btn flex space-x-2 bg-white text-cyan-800 shadow-md hover:bg-cyan-600"
                onClick={() =>
                  sendApplication(
                    vacancy.employer.employerProfile.email,
                    vacancy.id,
                  )
                }
              >
                <UserPlus className="h-5 w-5" />
                <span>Откликнуться</span>
              </button>
              <button
                className="btn btn-outline border-red-500 text-red-700 hover:bg-red-500 hover:text-white"
                onClick={isFavorite ? handleDelete : handleAdd}
              >
                {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
              </button>
            </div>
          )}
        </div>
        <p className="mb-2 text-cyan-900">Местоположение: {vacancy.location}</p>
        <p className="mb-2 text-cyan-900">
          Опыт работы: {vacancy.experienceLevel}
        </p>
        <p className="mb-4 text-cyan-900">Зарплата: {vacancy.salary} руб</p>
        <p className="text-sm text-cyan-600">
          Дата публикации: {new Date(vacancy.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="rounded-box mt-6 bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-cyan-800">
          Описание вакансии
        </h2>
        <p className="mt-4 text-cyan-900">{vacancy.description}</p>
      </div>
      {!mode && (
        <div className="rounded-box mt-6 flex flex-col items-center justify-between gap-4 bg-white p-6 shadow-lg sm:flex-row">
          <div className="text-cyan-800">
            <h2 className="mb-1 text-lg font-semibold text-cyan-800">
              Работодатель:{" "}
              <Link
                href={`/employer/${vacancy.employer.employerProfile.id}`}
                className="text-cyan-600 hover:underline"
              >
                {vacancy.employer.employerProfile.companyName}
              </Link>
            </h2>
            Контакты:{" "}
            <Link
              href={`mailto:${vacancy.employer.employerProfile.email}`}
              className="text-cyan-600 hover:underline"
            >
              {vacancy.employer.employerProfile.email}
            </Link>{" "}
            | {vacancy.employer.employerProfile.phoneNumber}
          </div>
        </div>
      )}
      <EditVacancyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancy={vacancy}
      />
    </div>
  );
}
