"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import { CircleUserRound, Heart } from "lucide-react";
import { signOut } from "next-auth/react";
import { api } from "~/trpc/react";

export function Navbar({
  session,
  seekerId,
  employerId,
  // favoriteJobs,
  // FavoriteSeekers,
}: {
  session: Session;
  seekerId?: string;
  employerId?: string;
  // favoriteJobs?: any[];
  // FavoriteSeekers?: any[];
}) {
  const favoriteJobs = api.vacancy.getFavoriteJobs.useQuery();
  const favoriteSeekers = api.seeker.getFavoriteSeekers.useQuery();
  return (
    <div className="navbar bg-cyan-100 px-6 shadow-md">
      <div className="flex flex-1 items-center gap-2">
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
          <button
            className="btn btn-sm btn-ghost mr-2 h-10 w-10 p-0 hover:bg-red-100"
            tabIndex={0}
            role="button"
            disabled={!session.user.role}
          >
            <Heart className="h-8 w-8 text-red-500" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-90 space-y-1 bg-white p-3 shadow-lg"
          >
            {session.user.role === "EMPLOYER" ? (
              favoriteSeekers.data?.length === 0 ? (
                <p>У вас нет избранных резюме соискателей</p>
              ) : (
                favoriteSeekers.data?.map((seeker) => (
                  <li key={seeker.seeker.id}>
                    <Link
                      href={`/seeker/${seeker.seeker.id}`}
                      className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                    >
                      {seeker.seeker.name} ({seeker.seeker.wish_job},{" "}
                      {seeker.seeker.experienceLevel})
                    </Link>
                  </li>
                ))
              )
            ) : favoriteJobs.data?.length === 0 ? (
              <p>У вас нет избранных вакансий</p>
            ) : (
              favoriteJobs.data?.map((job) => (
                <li key={job.job.id}>
                  <Link
                    href={`/vacancy/${job.job.id}`}
                    className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                  >
                    {job.job.title} ({job.job.location},{" "}
                    {job.job.employer.employerProfile?.companyName})
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:bg-cyan-200"
            disabled={!session.user.role}
          >
            <CircleUserRound
              className="h-10 w-10 text-cyan-800"
              strokeWidth={1.5}
            />
          </button>
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
