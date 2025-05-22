"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { EditEmployerForm } from "./EditEmployerForm";
import { useEmployerForm } from "~/hooks/useEmployerForm";

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
  const { formData, handleChange, handleSave } = useEmployerForm(
    employerInfo,
    isExistingEmployer,
    onClose,
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
              <Dialog.Panel className="rounded-box w-full max-w-md bg-white p-6 shadow-xl transition-all">
                <EditEmployerForm
                  formData={formData}
                  onChange={handleChange}
                  onSubmit={handleSave}
                  onCancel={onClose}
                  isExistingEmployer={isExistingEmployer}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
