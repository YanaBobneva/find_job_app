import Link from "next/link";

export function SigninLink() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-200">
      <div className="rounded-box w-full max-w-md bg-white p-10 text-center shadow-xl">
        <h1 className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold text-cyan-800">
          <img
            alt="GoWork"
            src="./GoWork.jpg"
            className="h-12 w-12 rounded-full"
          />
          GoWork
        </h1>

        <p className="mb-6 text-cyan-700">
          Пожалуйста, войдите в свой аккаунт, чтобы продолжить
        </p>
        <Link
          href="/api/auth/signin"
          className="btn w-full bg-cyan-500 text-white hover:bg-cyan-600"
        >
          Войти
        </Link>
      </div>
    </div>
  );
}
