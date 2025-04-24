"use client";

import { Pencil, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";
import { EditVacancyModal } from "./EditVacancyModal";
import { useState } from "react";
import type { $Enums } from "@prisma/client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function VacancyInfo({
  vacancy,
  role,
  employerId,
}: {
  vacancy: any;
  role: any;
  employerId: string | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteMutation = api.vacancy.deleteVacancy.useMutation();
  const router = useRouter();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteMutation.mutateAsync({ jobId: vacancy.id });
      router.push(`/employer/${employerId}`); // редирект после удаления
    } catch (error) {
      console.error("Ошибка при удалении вакансии:", error);
    }
  };
  return (
    <div>
      <div className="rounded-box relative bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 shadow-lg">
        {role === "EMPLOYER" ? (
          <div className="absolute top-4 right-4 flex space-x-4">
            <button
              className="text-cyan-800 hover:text-cyan-600"
              onClick={() => setIsModalOpen(true)}
            >
              <Pencil className="h-6 w-6" />
            </button>
            <button
              className="text-red-600 hover:text-red-500"
              onClick={handleDelete}
            >
              <Trash2 className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <button className="btn bg-white text-cyan-800 shadow-md hover:bg-cyan-600">
            <UserPlus className="mr-2 h-5 w-5" />
            Откликнуться
          </button>
        )}
        <h1 className="mb-2 text-3xl font-bold text-cyan-800">
          {vacancy.title}
        </h1>
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
      <div className="rounded-box mt-6 flex flex-col items-center justify-between gap-4 bg-white p-6 shadow-lg sm:flex-row">
        <div>
          <h2 className="mb-1 text-lg font-semibold text-cyan-800">
            Работодатель
          </h2>
          <Link
            href={`/employer/${vacancy.employer.id}`}
            className="text-cyan-600 hover:underline"
          >
            {vacancy.employer.name}
          </Link>{" "}
          |{" "}
          <Link
            href={`mailto:${vacancy.employer.email}`}
            className="text-cyan-600 hover:underline"
          >
            {vacancy.employer.email}
          </Link>{" "}
          |{" "}
          <span className="text-cyan-600 hover:underline">
            +{vacancy.employer.phoneNumber}
          </span>
        </div>
      </div>
      <EditVacancyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancy={vacancy}
      />
    </div>
  );
}
