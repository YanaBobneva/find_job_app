import { Briefcase, MapPin, Mail, User, Heart } from "lucide-react";

export function VacancyCard({ vacancy }: { vacancy: any }) {
  return (
    <div className="card bg-white shadow-md transition-all hover:shadow-lg">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <h2 className="card-title text-cyan-800">
            <Briefcase className="mr-2 h-5 w-5" />
            {vacancy.title}
          </h2>
          <button className="btn btn-sm btn-ghost text-red-500 hover:bg-red-100">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <p className="flex items-center text-cyan-900">
          <User className="mr-2 h-4 w-4" />
          {vacancy.company}
        </p>
        <p className="flex items-center text-cyan-900">
          <MapPin className="mr-2 h-4 w-4" />
          {vacancy.location}
        </p>
        <p className="flex items-center text-cyan-900">
          <Briefcase className="mr-2 h-4 w-4" />
          Требуемый опыт: {vacancy.experience}
        </p>

        <div className="mt-4 flex justify-between">
          <button className="btn btn-outline btn-sm border-cyan-500 text-cyan-700 hover:bg-cyan-500 hover:text-white">
            📄 Подробнее
          </button>
          <a
            href={`mailto:${vacancy.contact}`}
            className="btn btn-sm bg-cyan-500 text-white hover:bg-cyan-600"
          >
            <Mail className="mr-2 h-4 w-4" /> Откликнуться
          </a>
        </div>
      </div>
    </div>
  );
}
