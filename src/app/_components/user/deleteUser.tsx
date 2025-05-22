"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function DeleteUser() {
  const deleteMutation = api.user.deleteUser.useMutation();
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteMutation.mutateAsync();
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Ошибка при удалении вакансии:", error);
    }
  };

  return (
    <div className="rounded-box border border-red-300 bg-red-50 p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-red-600">
        Удалить аккаунт
      </h2>
      <p className="mb-4 text-sm text-red-800">
        Внимание: удаление аккаунта необратимо. Все ваши данные будут
        безвозвратно удалены.
      </p>

      <button
        className="btn bg-red-600 text-white hover:bg-red-700"
        onClick={handleDelete}
      >
        Удалить аккаунт
      </button>
    </div>
  );
}
