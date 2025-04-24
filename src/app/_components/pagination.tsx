import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="join">
        <button className="join-item btn btn-outline">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button className="join-item btn btn-active bg-cyan-500 text-white hover:bg-cyan-600">
          1
        </button>
        <button className="join-item btn btn-outline">2</button>
        <button className="join-item btn btn-outline">3</button>
        <button className="join-item btn btn-outline">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
