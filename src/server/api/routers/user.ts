import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  deleteUser: protectedProcedure
    .mutation(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not authenticated" });
      }

      const existingUser = await ctx.db.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      await ctx.db.user.delete({
        where: { id: userId },
      });

      return { success: true };
    }),
  updateEmail: protectedProcedure
  .input(
    z.object({
      newEmail: z.string().email(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    if (!userId) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not authenticated" });
    }

    const existingUser = await ctx.db.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    const emailInUse = await ctx.db.user.findUnique({
      where: { email: input.newEmail },
    });

    if (emailInUse && emailInUse.id !== userId) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Этот email уже используется",
      });
    }

    await ctx.db.user.update({
      where: { id: userId },
      data: { email: input.newEmail },
    });

    return { success: true };
  }),
});
