"use client";

import type { $Enums, User } from "@prisma/client";
import { useState } from "react";
import { updateUser } from "~/app/api/action/user";

type Props = {
  user: {
    id: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: $Enums.Role | null;
  };
};

export default function ChooseRole({ user }: Props) {
  const [role, setRole] = useState("");

  return (
    <div className="mx-auto mt-20 max-w-xl p-6">
      <div className="rounded-box bg-gradient-to-br from-cyan-100 to-cyan-200 p-8 shadow-lg">
        <h2 className="mb-8 text-center text-3xl font-bold text-cyan-800">
          Выберите свою роль
        </h2>

        <form className="flex flex-col items-center gap-6" action={updateUser}>
          <input type="hidden" name="id" defaultValue={user.id ?? ""} />
          <select
            className="select select-bordered w-60 text-center"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="role"
          >
            <option value="" disabled>
              -- выберите --
            </option>
            <option value="SEEKER">Соискатель</option>
            <option value="EMPLOYER">Работодатель</option>
          </select>

          <button
            className={`btn w-60 bg-cyan-500 text-white hover:bg-cyan-600 ${!role ? "cursor-not-allowed opacity-50" : ""}`}
            type="submit"
            disabled={!role} // кнопка будет неактивной, если роль не выбрана
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
