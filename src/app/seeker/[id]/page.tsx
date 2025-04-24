import SeekerInfo from "~/app/_components/seeker/SeekerInfo";

export default function SeekerPage() {
  const profile = {
    id: "abc123",
    name: "Иван",
    surname: "Петров",
    fathername: "Алексеевич",
    gender: "Мужской",
    birthday: "1998-05-12T00:00:00Z",
    phoneNumber: 79991234567,
    email: "ivan.petrov@example.com",
    education: "МГТУ им. Баумана, Прикладная информатика",
    resume:
      "Опыт работы: 2 года фронтенда, React, TypeScript. Проекты: CRM, ERP. Навыки: адаптивная вёрстка, CI/CD.",
    wish_job: "Фронтенд-разработчик",
    experienceLevel: "Без опыта",
  };

  return <SeekerInfo profile={profile} />;
}
