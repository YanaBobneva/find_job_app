"use client";

import { CirclePlus } from "lucide-react";
import { AddVacancyModal } from "./AddVacancyModal";
import { useState } from "react";

export const AddVacancyButton = () => {
  const [isAddJobModalOpen, setAddJobModalOpen] = useState(false);
  return (
    <div className="flex justify-end">
      <button
        className="btn bg-cyan-500 text-white shadow-md hover:bg-cyan-600"
        onClick={() => setAddJobModalOpen(true)}
      >
        <CirclePlus />
        Создать вакансию
      </button>
      <AddVacancyModal
        isOpen={isAddJobModalOpen}
        onClose={() => setAddJobModalOpen(false)}
      />
    </div>
  );
};
