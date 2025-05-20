"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { EditEmployerInfoModal } from "./EditEmployerInfoModal";

export const EmployerInfo = ({
  employer,
  mode,
}: {
  employer: any;
  mode: boolean;
}) => {
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
        name: "",
        description: "",
        email: "",
        phoneNumber: "",
        website: "",
      };

  const employerExists = employer !== undefined && employer !== null;

  return (
    <div className="rounded-box relative bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 shadow-lg">
      {mode && (
        <button
          className="absolute top-4 right-4 cursor-pointer text-cyan-800 hover:text-cyan-600"
          onClick={openModal}
        >
          <Pencil className="h-7 w-7" />
        </button>
      )}
      <h1 className="mb-2 text-3xl font-bold text-cyan-900">
        Компания: {employerInfoToPass.name}
      </h1>
      <p className="mb-1 text-cyan-900">
        <strong>Описание:</strong> {employerInfoToPass.description}
      </p>
      <p className="text-sm text-cyan-700">
        <span className="block">
          <strong className="text-cyan-900">Почта:</strong>{" "}
          <a href={`mailto:${employerInfoToPass.email}`} className="underline">
            {employerInfoToPass.email}
          </a>
        </span>
        <span className="block">
          <strong className="text-cyan-900">Телефон:</strong>{" "}
          <span>{employerInfoToPass.phoneNumber}</span>
        </span>
        <span className="block">
          <strong className="text-cyan-900">Сайт:</strong>{" "}
          <a
            href={employerInfoToPass.website || "#"}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {employerInfoToPass.website}
          </a>
        </span>
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
