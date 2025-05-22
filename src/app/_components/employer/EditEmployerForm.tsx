import React from "react";

interface EditEmployerFormProps {
  formData: {
    companyName: string;
    description: string;
    email: string;
    phoneNumber: string;
    website: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isExistingEmployer: boolean;
}

export const EditEmployerForm = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isExistingEmployer,
}: EditEmployerFormProps) => (
  <>
    <h2 className="mb-4 text-2xl font-bold text-cyan-800">
      {isExistingEmployer ? "Редактирование " : "Добавление "} информации о
      компании
    </h2>
    <form className="space-y-4" onSubmit={onSubmit}>
      {[
        { label: "Название компании", name: "companyName", type: "text" },
        { label: "Описание", name: "description", type: "textarea" },
        { label: "Почта", name: "email", type: "text" },
        { label: "Номер телефона", name: "phoneNumber", type: "text" },
        { label: "Сайт", name: "website", type: "text" },
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label className="text-cyan-700">{label}</label>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={(formData as any)[name]}
              onChange={onChange}
              className="textarea textarea-bordered w-full"
              required
            />
          ) : (
            <input
              name={name}
              type="text"
              value={(formData as any)[name]}
              onChange={onChange}
              className="input input-bordered w-full"
              required
            />
          )}
        </div>
      ))}

      <div className="flex justify-end gap-2">
        <button type="button" className="btn" onClick={onCancel}>
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
  </>
);
