import { Filter } from "lucide-react";

export function Filters() {
  return (
    <div className="rounded-box mb-6 bg-cyan-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="form-control w-48">
          <label className="label">
            <span className="label-text text-cyan-800">Город</span>
          </label>
          <select className="select select-bordered">
            <option>Все города</option>
            <option>Москва</option>
            <option>Санкт-Петербург</option>
          </select>
        </div>

        <div className="form-control w-48">
          <label className="label">
            <span className="label-text text-cyan-800">Опыт</span>
          </label>
          <select className="select select-bordered">
            <option>Любой</option>
            <option>0-1 год</option>
            <option>1-3 года</option>
            <option>3+ лет</option>
          </select>
        </div>

        <div className="form-control w-48">
          <label className="label">
            <span className="label-text text-cyan-800">Должность</span>
          </label>
          <input
            type="text"
            placeholder="Например, дизайнер"
            className="input input-bordered"
          />
        </div>

        <button className="btn btn-outline mt-6 border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white">
          <Filter className="mr-2 h-4 w-4" /> Применить
        </button>
      </div>
    </div>
  );
}
