"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { signOut } from "next-auth/react";

export function Navbar({
  session,
  seekerId,
  employerId,
}: {
  session: Session;
  seekerId?: string;
  employerId?: string;
}) {
  return (
    <div className="navbar bg-cyan-100 px-6 shadow-md">
      <div className="flex-1">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-cyan-800 transition-all hover:text-cyan-700"
        >
          <img
            alt="GoWork"
            src="/GoWork.jpg" // лучше использовать абсолютный путь из папки public
            className="h-12 w-12 rounded-full"
          />
          GoWork
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-cyan-200"
          >
            <CircleUserRound
              className="h-10 w-10 text-cyan-800"
              strokeWidth={1.5}
            />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-56 space-y-1 bg-white p-3 shadow-lg"
          >
            <li>
              <Link
                href={
                  session.user.role === "SEEKER"
                    ? `/seeker/${seekerId}`
                    : `/employer/${employerId}`
                }
                className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
              >
                Профиль
              </Link>
            </li>
            <li>
              <Link
                href={"/accountSettings"}
                className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
              >
                Настройки
              </Link>
            </li>
            <li>
              <a
                className="text-sm font-medium text-red-500 hover:text-red-700"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// const handleClick = (event: React.MouseEvent) => {
//   if (role === null) {
//     event.preventDefault(); // Блокируем переход
//     // alert("Переход заблокирован");
//   }
// };

// const toggleDropdown = () => {
//   if (role === null) {
//     return;
//   }
//   setIsOpen(!isOpen); // Переключение состояния
// };
