import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { experienceLevels } from "~/date/experienceLevels";
import { api } from "~/trpc/react";

type EditVacancyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vacancy: {
    title: string;
    description: string;
    location: string;
    salary: number;
    experienceLevel: string;
    id: string;
  };
};

export const EditVacancyModal = ({
  isOpen,
  onClose,
  vacancy,
}: EditVacancyModalProps) => {
  const [formData, setFormData] = useState({
    title: vacancy.title,
    description: vacancy.description,
    location: vacancy.location,
    experienceLevel: vacancy.experienceLevel,
    salary: vacancy.salary,
    jobId: vacancy.id,
  });

  const updateMutation = api.vacancy.updateVacancy.useMutation();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync(formData);
      onClose(); // Закрыть окно после успешного добавления
    } catch (error) {
      console.error("Ошибка при изменении вакансии:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
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
              <Dialog.Panel className="rounded-box w-full max-w-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="mb-4 text-2xl font-bold text-cyan-800">
                  Редактировать вакансию
                </Dialog.Title>

                <form className="space-y-4" onSubmit={handleUpdate}>
                  <div>
                    <label className="text-cyan-700">Название</label>
                    <input
                      name="title"
                      type="text"
                      value={formData.title}
                      className="input input-bordered w-full"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="text-cyan-700">Местоположение</label>
                    <input
                      name="location"
                      type="text"
                      value={formData.location}
                      className="input input-bordered w-full"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="text-cyan-700">Зарплата</label>
                    <input
                      name="salary"
                      type="number"
                      value={formData.salary}
                      className="input input-bordered w-full"
                      onChange={handleChange}
                    />
                  </div>

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

                  <div>
                    <label className="text-cyan-700">Описание</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      className="textarea textarea-bordered w-full"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn" onClick={onClose}>
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="btn bg-cyan-600 text-white hover:bg-cyan-700"
                    >
                      Сохранить
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
};
