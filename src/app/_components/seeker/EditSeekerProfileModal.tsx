"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { experienceLevels } from "~/date/experienceLevels";
import { api } from "~/trpc/react";
import { CitySelector } from "../citySelector";

type EditSeekerProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  seekerInfo: {
    name: string;
    surname: string;
    fathername: string;
    gender: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    education: string;
    resume: string;
    wish_job: string;
    experienceLevel: string;
    location: string;
  };
  isExistingSeeker: boolean;
};

export const EditSeekerProfileModal = ({
  isOpen,
  onClose,
  seekerInfo,
  isExistingSeeker,
}: EditSeekerProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: seekerInfo.name,
    surname: seekerInfo.surname,
    fathername: seekerInfo.fathername,
    gender: seekerInfo.gender,
    birthday: seekerInfo.birthday,
    phoneNumber: seekerInfo.phoneNumber,
    email: seekerInfo.email,
    education: seekerInfo.education,
    resume: seekerInfo.resume,
    wish_job: seekerInfo.wish_job,
    experienceLevel: seekerInfo.experienceLevel,
    location: seekerInfo.location,
  });

  const genders = [
    { id: "Мужской", name: "Мужской" },
    { id: "Женский", name: "Женский" },
  ];

  const createMutation = api.seeker.createSeeker.useMutation();
  const updateMutation = api.seeker.updateSeeker.useMutation();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isExistingSeeker) {
        // Если существует, обновляем информацию
        await updateMutation.mutateAsync({
          name: formData.name,
          surname: formData.surname,
          fathername: formData.fathername,
          gender: formData.gender,
          birthday: new Date(formData.birthday),
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          education: formData.education,
          resume: formData.resume,
          wish_job: formData.wish_job,
          experienceLevel: formData.experienceLevel,
          location: formData.location,
        });
        router.refresh();
      } else {
        // Если нет, создаем новую
        const seeker = await createMutation.mutateAsync({
          name: formData.name,
          surname: formData.surname,
          fathername: formData.fathername,
          gender: formData.gender,
          birthday: new Date(formData.birthday),
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          education: formData.education,
          resume: formData.resume,
          wish_job: formData.wish_job,
          experienceLevel: formData.experienceLevel,
          location: formData.location,
        });
        router.push(`/seeker/${seeker.id}`);
      }
      onClose(); // Закрываем модал после успешного добавления/обновления
    } catch (error) {
      console.error("Ошибка при изменении информации о соискателе:", error);
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
              <Dialog.Panel className="rounded-box w-full max-w-3xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="mb-4 text-2xl font-bold text-cyan-800">
                  Редактировать профиль соискателя
                </Dialog.Title>

                <form
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  onSubmit={handleSave}
                >
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Фамилия</label>
                    <input
                      name="surname"
                      type="text"
                      value={formData.surname}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Фамилия"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Имя</label>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Имя"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Отчество</label>
                    <input
                      name="fathername"
                      type="text"
                      value={formData.fathername}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Отчество"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Пол</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="" disabled>
                        Выберите пол
                      </option>
                      {genders.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                          {gender.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-cyan-700">Дата рождения</label>
                    <input
                      name="birthday"
                      type="date"
                      value={
                        formData.birthday
                          ? new Date(formData.birthday)
                              .toISOString()
                              .slice(0, 10)
                          : ""
                      }
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Дата рождения"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Телефон</label>
                    <input
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Телефон"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Образование</label>
                    <input
                      name="education"
                      type="text"
                      value={formData.education}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Образование"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Резюме</label>
                    <textarea
                      name="resume"
                      value={formData.resume}
                      onChange={handleChange}
                      rows={4}
                      className="textarea textarea-bordered w-full"
                      placeholder="Укажите свои навыки и предыдущие места работы"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Желаемая должность</label>
                    <input
                      name="wish_job"
                      type="text"
                      value={formData.wish_job}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Укажите желаемую должность"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Опыт работы</label>
                    <select
                      name="experienceLevel"
                      className="select select-bordered w-full"
                      value={formData.experienceLevel}
                      onChange={handleChange}
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
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Город</label>
                    <CitySelector
                      value={formData.location}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, location: value }))
                      }
                    />
                  </div>

                  <div className="col-span-2 mt-4 flex justify-end gap-2">
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
