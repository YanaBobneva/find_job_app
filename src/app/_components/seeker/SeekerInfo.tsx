"use client";

import { useState } from "react";
import { EditSeekerProfileModal } from "../../_components/seeker/EditSeekerProfileModal";

export default function SeekerInfo({ profile }: { profile: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-box bg-base-100 p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-cyan-800">
            Профиль соискателя
          </h1>
          <button
            className="btn btn-outline btn-sm border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Редактировать профиль
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 text-cyan-900 sm:grid-cols-2">
          <div>
            <span className="font-semibold">ФИО:</span> {profile.surname}{" "}
            {profile.name} {profile.fathername}
          </div>
          <div>
            <span className="font-semibold">Пол:</span> {profile.gender}
          </div>
          <div>
            <span className="font-semibold">Дата рождения:</span>{" "}
            {new Date(profile.birthday).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Телефон:</span> +
            {profile.phoneNumber}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            <a
              className="text-cyan-600 hover:underline"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </div>
          <div>
            <span className="font-semibold">Желаемая должность:</span>{" "}
            {profile.wish_job}
          </div>
          <div>
            <span className="font-semibold">Опыт:</span>{" "}
            {profile.experienceLevel}
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold">Образование:</span>{" "}
            {profile.education}
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold">Резюме:</span>
            <div className="mt-1 rounded-md border border-gray-200 bg-gray-50 p-3 whitespace-pre-wrap">
              {profile.resume}
            </div>
          </div>
        </div>
      </div>
      <EditSeekerProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
      />
    </div>
  );
}
