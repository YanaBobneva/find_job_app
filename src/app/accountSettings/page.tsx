export default function AccountSettingsPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-cyan-800">
        Настройки аккаунта
      </h1>

      {/* Блок изменения email */}
      <div className="rounded-box bg-base-100 mb-10 p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-cyan-700">
          Изменить email
        </h2>
        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Новый email</span>
            </label>
            <input
              type="email"
              placeholder="example@mail.ru"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button className="btn bg-cyan-600 text-white hover:bg-cyan-700">
            Сохранить изменения
          </button>
        </form>
      </div>

      {/* Блок удаления аккаунта */}
      <div className="rounded-box border border-red-300 bg-red-50 p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-red-600">
          Удалить аккаунт
        </h2>
        <p className="mb-4 text-sm text-red-800">
          Внимание: удаление аккаунта необратимо. Все ваши данные будут
          безвозвратно удалены.
        </p>

        <button className="btn bg-red-600 text-white hover:bg-red-700">
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
}
