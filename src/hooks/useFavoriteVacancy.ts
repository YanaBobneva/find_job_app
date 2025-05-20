import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";

export function useFavoriteVacancy(vacancyId: string) {
  const utils = api.useUtils();

  const favoriteJobs = api.vacancy.getFavoriteJobs.useQuery();
  const isFavorite = favoriteJobs.data?.some(
    (job) => job.job.id === vacancyId,
  );

  const addToFavorites = api.vacancy.addToFavorites.useMutation({
    onSuccess: () => {
      utils.vacancy.getFavoriteJobs.invalidate();
      toast.success("Вакансия добавлена в избранное");
    },
    onError: (error) => {
      toast.error(
        error.message === "Vacancy already in favorites"
          ? "Вакансия уже в избранном"
          : "Ошибка при добавлении",
      );
    },
  });

  const deleteFromFavorites = api.vacancy.deleteFromFavorites.useMutation({
    onSuccess: () => {
      utils.vacancy.getFavoriteJobs.invalidate();
      toast.success("Вакансия удалена из избранного");
    },
    onError: () => {
      toast.error("Ошибка при удалении из избранного");
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addToFavorites.mutate({ jobId: vacancyId });
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteFromFavorites.mutate({ jobId: vacancyId });
  };

  return {
    isFavorite,
    handleAdd,
    handleDelete,
  };
}
