import { $Enums } from "@prisma/client";
import { z } from "zod";
import { requireRole } from "~/app/api/auth/check";
import {
  createTRPCRouter,
  protectedProcedure,
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
      // можно только если ты авторизован и выбрал роль работодателя
      const userId = requireRole(ctx, $Enums.Role.EMPLOYER);

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
    // можно только если ты авторизован и являешься работодателем 
    // проверять что данные принадлежат тому кто хочет их изменить нет необходимости так как изменения происходят через userId = ctx.session?.user.id
    const userId = requireRole(ctx, $Enums.Role.EMPLOYER);

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
  getEmployer: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id
      if (!userId) {
        throw new Error("User not authenticated");
      }

    const employer = await db.employerProfile.findFirst({
      where: { userId: userId },
    });

    return employer;
  }),
});
