"use client";

import { useState } from "react";
import { EditSeekerProfileModal } from "../../_components/seeker/EditSeekerProfileModal";
import { useFavoriteResume } from "~/hooks/useFavoriteResume";
import type { Role } from "@prisma/client";

export default function SeekerInfo({
  seeker,
  mode,
  role,
}: {
  seeker: any;
  mode: boolean;
  role: Role | null | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isFavorite, handleAdd, handleDelete } = seeker
    ? useFavoriteResume(seeker.id)
    : { isFavorite: false, handleAdd: () => {}, handleDelete: () => {} };

  const seekerInfoToPass = seeker
    ? {
        name: seeker.name,
        surname: seeker.surname,
        fathername: seeker.fathername,
        gender: seeker.gender,
        birthday: seeker.birthday,
        phoneNumber: seeker.phoneNumber,
        email: seeker.email,
        education: seeker.education,
        resume: seeker.resume,
        wish_job: seeker.wish_job,
        experienceLevel: seeker.experienceLevel,
        location: seeker.location,
      }
    : {
        name: "",
        surname: "",
        fathername: "",
        gender: "",
        birthday: "",
        phoneNumber: "",
        email: "",
        education: "",
        resume: "",
        wish_job: "",
        experienceLevel: "",
        location: "",
      };

  const seekerExists = seeker !== undefined && seeker !== null;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-box bg-base-100 p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-cyan-800">
            Профиль соискателя
          </h1>
          {mode && (
            <button
              className="btn btn-outline btn-sm border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Редактировать профиль
            </button>
          )}
          {role === "EMPLOYER" && (
            <button
              className="btn btn-outline btn-sm border-red-500 text-red-700 hover:bg-red-500 hover:text-white"
              onClick={isFavorite ? handleDelete : handleAdd}
            >
              {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 text-cyan-900 sm:grid-cols-2">
          <div>
            <span className="font-semibold">ФИО:</span>{" "}
            {seekerInfoToPass.surname} {seekerInfoToPass.name}{" "}
            {seekerInfoToPass.fathername}
          </div>
          <div>
            <span className="font-semibold">Пол:</span>{" "}
            {seekerInfoToPass.gender}
          </div>
          <div>
            <span className="font-semibold">Дата рождения:</span>{" "}
            {seekerInfoToPass.birthday
              ? new Date(seekerInfoToPass.birthday).toISOString().slice(0, 10)
              : ""}
          </div>
          <div>
            <span className="font-semibold">Телефон:</span>{" "}
            {seekerInfoToPass.phoneNumber}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            <a
              className="text-cyan-600 hover:underline"
              href={`mailto:${seekerInfoToPass.email}`}
            >
              {seekerInfoToPass.email}
            </a>
          </div>
          <div>
            <span className="font-semibold">Желаемая должность:</span>{" "}
            {seekerInfoToPass.wish_job}
          </div>
          <div>
            <span className="font-semibold">Опыт:</span>{" "}
            {seekerInfoToPass.experienceLevel}
          </div>
          <div>
            <span className="font-semibold">Город:</span>{" "}
            {seekerInfoToPass.location}
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold">Образование:</span>{" "}
            {seekerInfoToPass.education}
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold">Резюме:</span>
            <div className="mt-1 rounded-md border border-gray-200 bg-gray-50 p-3 whitespace-pre-wrap">
              {seekerInfoToPass.resume}
            </div>
          </div>
        </div>
      </div>
      <EditSeekerProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        seekerInfo={seekerInfoToPass}
        isExistingSeeker={seekerExists}
      />
    </div>
  );
}
