import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure, // если хотите защитить роут
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const vacancyRouter = createTRPCRouter({
  // Мутация для создания вакансии
  createVacancy: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        location: z.string(),
        experienceLevel: z.string(),
        salary: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Получаем userId из контекста
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User not authenticated"); // Если userId нет, выбрасываем ошибку
      }

      // Создание записи о вакансии в базе данных
      const newVacancy = await db.job.create({
        data: {
          title: input.title,
          description: input.description,
          location: input.location,
          experienceLevel: input.experienceLevel,
          salary: input.salary,
          employerId: userId, // Ссылаемся на работодателя через userId
        },
      });

      // Возвращаем созданную вакансию
      return newVacancy;
    }),

  // Мутация для обновления информации о вакансии
  updateVacancy: protectedProcedure
    .input(
      z.object({
        jobId: z.string(),
        title: z.string(),
        description: z.string(),
        location: z.string(),
        experienceLevel: z.string(),
        salary: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      // ДОБАВИТЬ ОГРАНИЧЕНИЯ ПО РОЛИ !!!

      // Обновление информации о вакансии
      const updatedVacancy = await db.job.update({
        where: { id: input.jobId },
        data: {
          title: input.title,
          description: input.description,
          location: input.location,
          experienceLevel: input.experienceLevel,
          salary: input.salary,
        },
      });

      return updatedVacancy;
    }),
    
  // Мутация для удаления вакансии
  deleteVacancy: protectedProcedure
  .input(z.object({ jobId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;
    if (!userId) throw new Error("User not authenticated");

    // Проверка, принадлежит ли вакансия текущему пользователю
    const vacancy = await db.job.findUnique({
      where: { id: input.jobId },
      select: { employerId: true },
    });

    if (!vacancy || vacancy.employerId !== userId) {
      throw new Error("Access denied: you are not the owner of this vacancy");
    }

    // Удаление вакансии
    await db.job.delete({
      where: { id: input.jobId },
    });

    return { success: true };
  }),
});
