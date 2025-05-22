"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import { experienceLevels } from "~/date/experienceLevels";
import { cities } from "~/date/russia";
import { api } from "~/trpc/react";
import { CitySelector } from "../citySelector";

export function AddVacancyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    experienceLevel: "",
    salary: "",
  });

  const createMutation = api.vacancy.createVacancy.useMutation();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<typeof cities>([]);

  // Фильтрация городов с задержкой
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query === "") {
        setFilteredCities([]);
      } else {
        const lowerQuery = query.toLowerCase();
        setFilteredCities(
          cities
            .filter((item) => item.city.toLowerCase().includes(lowerQuery))
            .slice(0, 20), // показываем только первые 20 городов
        );
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        experienceLevel: formData.experienceLevel,
        salary: Number(formData.salary),
      });
      router.refresh();
      onClose(); // Закрыть окно после успешного добавления
      // Очистить форму
      setFormData({
        title: "",
        description: "",
        location: "",
        experienceLevel: "",
        salary: "",
      });
    } catch (error) {
      console.error("Ошибка при добавлении вакансии:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="rounded-box w-full max-w-md bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="mb-4 text-2xl font-bold text-cyan-800">
                  Создание вакансии
                </Dialog.Title>

                <form onSubmit={handleAdd} className="space-y-4">
                  <label className="text-cyan-700">Название вакансии</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Название вакансии"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />

                  <label className="text-cyan-700">Описание</label>
                  <textarea
                    name="description"
                    placeholder="Описание"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    required
                  />

                  <label className="text-cyan-700">Местоположение</label>
                  <CitySelector
                    value={formData.location}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, location: value }))
                    }
                  />

                  <label className="text-cyan-700">Опыт работы</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Выберите уровень опыта
                    </option>
                    {experienceLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>

                  <label className="text-cyan-700">Зарплата</label>
                  <input
                    name="salary"
                    type="number"
                    placeholder="Зарплата"
                    value={formData.salary}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />

                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn" onClick={onClose}>
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="btn bg-cyan-500 text-white shadow-md hover:bg-cyan-600"
                    >
                      Создать
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
