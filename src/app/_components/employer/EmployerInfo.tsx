"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { EditEmployerInfoModal } from "./EditEmployerInfoModal";

export const EmployerInfo = ({ employer }: { employer: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Преобразуем данные в нужный формат перед передачей в модальное окно
  const employerInfoToPass = employer
    ? {
        name: employer.companyName,
        description: employer.description || "", // Если null, то пустая строка
        email: employer.email || "", // Если null, то пустая строка
        phoneNumber: employer.phoneNumber,
        website: employer.website || "", // Если null, то пустая строка
      }
    : {
        name: "Название компании",
        description: "Описание компании",
        email: "email компании",
        phoneNumber: "Номер телефона компании",
        website: "Сайт компании",
      };

  const employerExists = employer !== undefined && employer !== null;

  return (
    <div className="rounded-box relative bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 shadow-lg">
      <button
        className="absolute top-4 right-4 cursor-pointer text-cyan-800 hover:text-cyan-600"
        onClick={openModal}
      >
        <Pencil className="h-7 w-7" />
      </button>

      <h1 className="mb-2 text-3xl font-bold text-cyan-800">
        {employerInfoToPass.name}
      </h1>
      <p className="mb-1 text-cyan-900">{employerInfoToPass.description}</p>
      <p className="text-sm text-cyan-700">
        Контакты:{" "}
        <a href={`mailto:${employerInfoToPass.email}`} className="underline">
          {employerInfoToPass.email}
        </a>
        {"  "}|{"  "}
        <a href={employerInfoToPass.website || ""} className="underline">
          {employerInfoToPass.website}
        </a>
        {"  "}|{"  "}+7{employerInfoToPass.phoneNumber}
      </p>

      {/* Выводим модальное окно с актуальными данными */}
      <EditEmployerInfoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        employerInfo={employerInfoToPass} // Передаем данные в модальное окно
        isExistingEmployer={employerExists} // Передаем информацию о том, существует ли компания
      />
    </div>
  );
};
