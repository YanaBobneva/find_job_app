import { auth } from "~/server/auth";
import DeleteUser from "../_components/user/deleteUser";
import UpdateUser from "../_components/user/updateUser";

export default async function AccountSettingsPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-cyan-800">
        Настройки аккаунта
      </h1>
      <UpdateUser user={user} />
      <DeleteUser />
    </div>
  );
}
