import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  deleteUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!existingUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      await ctx.db.user.delete({
        where: { id: input.userId },
      });

      return { success: true };
    }),
  updateEmail: protectedProcedure
  .input(
    z.object({
      userId: z.string(),
      newEmail: z.string().email(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { userId, newEmail } = input;

    const existingUser = await ctx.db.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    const emailInUse = await ctx.db.user.findUnique({
      where: { email: newEmail },
    });

    if (emailInUse && emailInUse.id !== userId) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Этот email уже используется",
      });
    }

    await ctx.db.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });

    return { success: true };
  }),
});
