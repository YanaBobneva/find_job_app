import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";

export function useFavoriteResume(seekerId: string) {
    const utils = api.useUtils();
    const favoriteSeekers = api.seeker.getFavoriteSeekers.useQuery();
    const isFavorite = favoriteSeekers.data?.some(
        (seeker) => seeker.seeker.id === seekerId,
    );
    const addToFavorites = api.seeker.addToFavorites.useMutation({
        onSuccess: () => {
            utils.seeker.getFavoriteSeekers.invalidate();
            toast.success("Резюме добавлено в избранное");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const deleteFromFavorites = api.seeker.deleteFromFavorites.useMutation({
        onSuccess: () => {
            utils.seeker.getFavoriteSeekers.invalidate();
            toast.success("Резюме удалено из избранного");
        },
        onError: () => {
            toast.error("Произошла ошибка при удалении резюме из избранного");
        },
    });
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        addToFavorites.mutate({ seekerId: seekerId});
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        deleteFromFavorites.mutate({ seekerId: seekerId});
    };
    return { isFavorite, handleAdd, handleDelete };
}