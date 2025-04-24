import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure, // если хотите защитить роут
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const employerRouter = createTRPCRouter({
  // Мутация для создания нового профиля работодателя
  createEmployer: protectedProcedure
    .input(
      z.object({
        companyName: z.string(),
        description: z.string().optional(),
        phoneNumber: z.string(),
        email: z.string().optional(),
        website: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Получаем userId из контекста
      const userId = ctx.session?.user.id; // Предположим, что userId хранится в session.user.id

      if (!userId) {
        throw new Error("User not authenticated"); // Если userId нет, то выбрасываем ошибку
      }
      // Создание записи в базе данных
      const newEmployer = await db.employerProfile.create({
        data: {
          userId,
          companyName: input.companyName,
          description: input.description,
          phoneNumber: input.phoneNumber,
          email: input.email,
          website: input.website,
        },
      });

      // Возвращаем созданного работодателя
      return newEmployer;
    }),

  // Обновляем информацию о компании
  updateEmployerInfo: protectedProcedure
  .input(
    z.object({
      companyName: z.string(),
      description: z.string().optional(),
      phoneNumber: z.string(),
      email: z.string().optional(),
      website: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const updatedEmployerInfo = await db.employerProfile.update({
      where: { userId },
      data: {
        companyName: input.companyName,
        description: input.description ?? null,
        phoneNumber: input.phoneNumber,
        email: input.email ?? null,
        website: input.website ?? null,
      },
    });

    return updatedEmployerInfo;
  }),
});
