"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { api } from "../../../trpc/react";
import { useRouter } from "next/navigation";

interface EditEmployerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  employerInfo: {
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    website: string;
  };
  isExistingEmployer: boolean;
}

export const EditEmployerInfoModal = ({
  isOpen,
  onClose,
  employerInfo,
  isExistingEmployer,
}: EditEmployerInfoModalProps) => {
  const [formData, setFormData] = useState({
    companyName: employerInfo.name,
    description: employerInfo.description,
    email: employerInfo.email,
    phoneNumber: employerInfo.phoneNumber,
    website: employerInfo.website,
  });

  const createMutation = api.employer.createEmployer.useMutation();
  const updateMutation = api.employer.updateEmployerInfo.useMutation();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isExistingEmployer) {
        // Если компания существует, обновляем информацию
        await updateMutation.mutateAsync({
          companyName: formData.companyName,
          description: formData.description,
          phoneNumber: formData.phoneNumber.toString(),
          email: formData.email,
          website: formData.website,
        });
        router.refresh();
      } else {
        // Если компании нет, создаем новую
        const employer = await createMutation.mutateAsync({
          companyName: formData.companyName,
          description: formData.description,
          phoneNumber: formData.phoneNumber.toString(),
          email: formData.email,
          website: formData.website,
        });
        router.push(`/employer/${employer.id}`);
      }
      onClose(); // Закрываем модал после успешного добавления/обновления
    } catch (error) {
      console.error("Ошибка при изменении информации о компании:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                  {isExistingEmployer ? "Редактирование " : "Добавление "}
                  информации о компании
                </Dialog.Title>

                <form className="space-y-4" onSubmit={handleSave}>
                  <div>
                    <label className="text-cyan-700">Название компании</label>
                    <input
                      name="companyName"
                      type="text"
                      placeholder="Название компании"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-cyan-700">Описание</label>
                    <textarea
                      name="description"
                      placeholder="Описание"
                      value={formData.description}
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-cyan-700">Почта</label>
                    <input
                      name="email"
                      type="text"
                      placeholder="Почта"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-cyan-700">Номер телефона</label>
                    <input
                      name="phoneNumber"
                      type="text"
                      placeholder="Номер телефона"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-cyan-700">Сайт</label>
                    <input
                      name="website"
                      type="text"
                      placeholder="Сайт"
                      value={formData.website}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" className="btn" onClick={onClose}>
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="btn bg-cyan-500 text-white shadow-md hover:bg-cyan-600"
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
