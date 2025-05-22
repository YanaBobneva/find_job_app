"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function UpdateUser({ user }: { user: any }) {
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState(user.email);
  const updateMutation = api.user.updateEmail.useMutation();
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ newEmail: newEmail });
    setNewEmail("");
    setEmail(newEmail);
  };

  return (
    <div className="rounded-box bg-base-100 mb-10 p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-cyan-700">
        Изменить email
      </h2>
      <form className="space-y-4" onSubmit={handleUpdate}>
        <div className="form-control">
          <h1 className="text-md mb-4 font-semibold text-cyan-900">
            Текущий email: {email}
          </h1>
          <label className="label">
            <span className="label-text">Новый email</span>
          </label>
          <input
            type="email"
            placeholder="example@mail.ru"
            className="input input-bordered w-full"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        <button
          className="btn bg-cyan-600 text-white hover:bg-cyan-700"
          type="submit"
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}
