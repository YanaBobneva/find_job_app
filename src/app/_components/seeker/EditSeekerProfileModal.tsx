"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type EditSeekerProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    surname: string;
    fathername: string;
    gender: string;
    birthday: string;
    phoneNumber: number;
    email: string;
    education: string;
    resume: string;
    wish_job: string;
    experienceLevel?: {
      id: string;
      name: string;
    };
  };
};

const experienceOptions = [
  "Нет опыта",
  "До года",
  "1-3 года",
  "4-6 лет",
  "7 и более лет",
];

export const EditSeekerProfileModal = ({
  isOpen,
  onClose,
  profile,
}: EditSeekerProfileModalProps) => {
  const [selectedExperience, setSelectedExperience] = useState(
    profile.experienceLevel?.name ?? "Нет опыта",
  );

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

                <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Фамилия</label>
                    <input
                      name="surname"
                      type="text"
                      defaultValue={profile.surname}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Имя</label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={profile.name}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Отчество</label>
                    <input
                      name="fathername"
                      type="text"
                      defaultValue={profile.fathername}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Пол</label>
                    <input
                      name="gender"
                      type="text"
                      defaultValue={profile.gender}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Дата рождения</label>
                    <input
                      name="birthday"
                      type="date"
                      defaultValue={profile.birthday.slice(0, 10)}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Телефон</label>
                    <input
                      name="phoneNumber"
                      type="tel"
                      defaultValue={profile.phoneNumber}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="text-cyan-700">Email</label>
                    <input
                      name="email"
                      type="email"
                      defaultValue={profile.email}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Образование</label>
                    <input
                      name="education"
                      type="text"
                      defaultValue={profile.education}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Резюме</label>
                    <textarea
                      name="resume"
                      defaultValue={profile.resume}
                      rows={4}
                      className="textarea textarea-bordered w-full"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Желаемая должность</label>
                    <input
                      name="wish_job"
                      type="text"
                      defaultValue={profile.wish_job}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-cyan-700">Опыт</label>
                    <select
                      name="experienceLevel"
                      className="select select-bordered w-full"
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                    >
                      {experienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
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
