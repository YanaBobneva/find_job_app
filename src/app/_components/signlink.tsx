"use client";

import Link from "next/link";
import Image from "next/image";

export default function SigninLink() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-cyan-50 to-blue-50">
      <header className="sticky top-0 z-10 bg-white/80 px-6 py-4 shadow-md backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-cyan-800 hover:text-cyan-700"
          >
            <img
              src="/GoWork.jpg"
              alt="GoWork"
              className="h-10 w-10 rounded-full"
            />
            GoWork
          </Link>
          <div className="flex gap-3">
            <Link
              href="/api/auth/signin"
              className="rounded-lg px-4 py-2 font-medium text-cyan-700 hover:bg-cyan-100/80"
            >
              Войти
            </Link>
            <Link
              href="/api/auth/signin"
              className="rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-700"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-3 md:py-5">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-stretch lg:gap-16">
            <div className="flex flex-1 flex-col justify-center lg:py-12">
              <h1 className="mb-6 text-4xl leading-tight font-bold text-cyan-900 md:text-5xl lg:text-6xl">
                Найди работу <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  мечты
                </span>{" "}
                сегодня
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-cyan-800 md:text-xl">
                Тысячи компаний ищут таких специалистов как ты. Создай профиль,
                размести резюме и получи предложения от лучших работодателей.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  placeholder="Должность, ключевые навыки..."
                  className="flex-1 rounded-lg border border-cyan-300 px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none">
                  Найти работу
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {["IT", "Маркетинг", "Дизайн", "Финансы"].map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-medium text-cyan-800"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden flex-1 lg:flex lg:items-center lg:justify-end">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/find_job.png"
                  alt="Человек находит работу"
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-cyan-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-cyan-300">
          © {new Date().getFullYear()} GoWork. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
