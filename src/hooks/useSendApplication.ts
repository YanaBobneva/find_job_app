import { api } from "~/trpc/react";
import toast from "react-hot-toast";

export function useSendApplication() {
  const mutation = api.contact.sendApplication.useMutation({
    onSuccess: () => toast.success("Отклик отправлен"),
    onError: () => toast.error("Произошла ошибка при отправке отклика"),
  });

  const sendApplication = (employerEmail: string, vacancyId: string) => {
    mutation.mutate({ employerEmail, vacancyId });
  };

  return { sendApplication };
}
