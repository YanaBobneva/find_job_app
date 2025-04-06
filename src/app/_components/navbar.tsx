"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { signOut } from "next-auth/react";

export function Navbar({ session }: { session: Session }) {
  return (
    <div className="navbar bg-cyan-100 px-6 shadow-md">
      <div className="flex-1">
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-800 transition-all hover:text-cyan-700"
        >
          <img
            alt="GoWork"
            src="./GoWork.jpg"
            className="h-12 w-12 rounded-full"
          />
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
              className="h-20 w-20 text-cyan-800"
              strokeWidth={1.5}
            />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-56 space-y-1 bg-white p-3 shadow-lg"
          >
            <li>
              <Link
                href="/employer"
                className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
              >
                Профиль
              </Link>
            </li>
            <li>
              <a className="text-sm font-medium text-cyan-700 hover:text-cyan-900">
                Настройки
              </a>
            </li>
            <li>
              <a
                className="text-sm font-medium text-red-500 hover:text-red-700"
                onClick={() => signOut()}
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
