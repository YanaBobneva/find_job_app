"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Filter } from "lucide-react";
import { experienceLevels } from "~/date/experienceLevels";
import { CitySelector } from "./citySelector";
import { buildQuery } from "~/lib/buildQuery";

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    city: searchParams.get("city") ?? "",
    experience: searchParams.get("experience") ?? "",
    job: searchParams.get("job") ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    router.push(buildQuery(filters));
  };

  const handleResetFilters = () => {
    setFilters({ city: "", experience: "", job: "" });
    router.push("/"); // сброс всех фильтров
  };

  return (
    <div className="rounded-box mb-6 bg-cyan-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* Город */}
        <div className="form-control w-48">
          <label className="label">
            <span className="label-text text-cyan-800">Город</span>
          </label>
          <CitySelector
            value={filters.city}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, city: value }))
            }
          />
        </div>

        {/* Опыт */}
        <div className="form-control w-48">
          <label htmlFor="experience" className="label">
            <span className="label-text text-cyan-800">Опыт</span>
          </label>
          <select
            id="experience"
            name="experience"
            className="select select-bordered"
            value={filters.experience}
            onChange={handleChange}
          >
            <option value="">Выберите уровень опыта</option>
            {experienceLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        {/* Должность */}
        <div className="form-control w-48">
          <label className="label">
            <span className="label-text text-cyan-800">Должность</span>
          </label>
          <input
            type="text"
            name="job"
            className="input input-bordered"
            value={filters.job}
            onChange={handleChange}
            placeholder="Например, дизайнер"
          />
        </div>

        {/* Кнопки */}
        <button
          onClick={handleApplyFilters}
          className="btn btn-outline mt-6 border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white"
        >
          <Filter className="mr-2 h-4 w-4" /> Применить
        </button>

        <button
          onClick={handleResetFilters}
          className="btn btn-outline mt-6 border-red-500 text-red-700 hover:bg-red-500 hover:text-white"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
}
