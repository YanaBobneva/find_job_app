import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

// export const phoneNumberSchema = z
//   .string()
//   .regex(/^(\+7|8)\d{10}$/, "Неверный формат номера телефона");

export const seekerRouter = createTRPCRouter({
  // Создание нового профиля соискателя
  createSeeker: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        surname: z.string(),
        fathername: z.string(),
        gender: z.string(),
        birthday: z.coerce.date(),
        phoneNumber: z.string(),
        email: z.string().email(),
        education: z.string(),
        resume: z.string(),
        wish_job: z.string(),
        experienceLevel: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const newSeeker = await db.seekerProfile.create({
        data: {
          userId,
          name: input.name,
          surname: input.surname,
          fathername: input.fathername,
          gender: input.gender,
          birthday: input.birthday,
          phoneNumber: input.phoneNumber,
          email: input.email,
          education: input.education,
          resume: input.resume,
          wish_job: input.wish_job,
          experienceLevel: input.experienceLevel,
          location: input.location,
        },
      });

      return newSeeker;
    }),

  // Обновление профиля соискателя
  updateSeeker: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        surname: z.string(),
        fathername: z.string(),
        gender: z.string(),
        birthday: z.coerce.date(),
        phoneNumber: z.string(),
        email: z.string().email(),
        education: z.string(),
        resume: z.string(),
        wish_job: z.string(),
        experienceLevel: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      const updatedSeeker = await db.seekerProfile.update({
        where: { userId },
        data: {
          name: input.name,
          surname: input.surname,
          fathername: input.fathername,
          gender: input.gender,
          birthday: input.birthday,
          phoneNumber: input.phoneNumber,
          email: input.email,
          education: input.education,
          resume: input.resume,
          wish_job: input.wish_job,
          experienceLevel: input.experienceLevel,
          location: input.location,
        },
      });

      return updatedSeeker;
    }),
    // 🔹 Добавление соискателя в избранное
  addToFavorites: protectedProcedure
    .input(z.object({ seekerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const employerId = ctx.session?.user.id;
      if (!employerId) {
        throw new Error("User not authenticated");
      }

      try {
        const favorite = await db.favoriteSeeker.create({
          data: {
            employerId,
            seekerId: input.seekerId,
          },
        });

        return { success: true, favorite };
      } catch (error: any) {
        if (error.code === "P2002") {
          throw new Error("Seeker already in favorites");
        }
        console.error("Error adding seeker to favorites:", error);
        throw new Error("Failed to add seeker to favorites");
      }
    }),
    getFavoriteSeekers: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session?.user.id;
      if (!userId) throw new Error("User not authenticated");

      const favorites = await db.favoriteSeeker.findMany({
        where: { employerId: userId },
        include: {
          seeker: true,
        },
      });

      return favorites;
    }),
      // 🔹 Удаление соискателя из избранного
  deleteFromFavorites: protectedProcedure
    .input(z.object({ seekerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const employerId = ctx.session?.user.id;
      if (!employerId) throw new Error("User not authenticated");

      await db.favoriteSeeker.delete({
        where: {
          employerId_seekerId: {
            employerId,
            seekerId: input.seekerId,
          },
        },
      });

      return { success: true };
    }),
});
