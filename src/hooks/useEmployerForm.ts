import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface EmployerInfo {
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  website: string;
}

export const useEmployerForm = (
  initialData: EmployerInfo,
  isExistingEmployer: boolean,
  onSuccess: () => void
) => {
  const [formData, setFormData] = useState({
    companyName: initialData.name,
    description: initialData.description,
    email: initialData.email,
    phoneNumber: initialData.phoneNumber,
    website: initialData.website,
  });

  const router = useRouter();
  const createMutation = api.employer.createEmployer.useMutation();
  const updateMutation = api.employer.updateEmployerInfo.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isExistingEmployer) {
        await updateMutation.mutateAsync({
          companyName: formData.companyName,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          website: formData.website,
        });
        router.refresh();
      } else {
        const employer = await createMutation.mutateAsync({
          companyName: formData.companyName,
          description: formData.description,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          website: formData.website,
        });
        router.push(`/employer/${employer.id}`);
      }
      onSuccess();
    } catch (error) {
      console.error("Ошибка при сохранении информации о компании:", error);
    }
  };

  return { formData, handleChange, handleSave };
};
