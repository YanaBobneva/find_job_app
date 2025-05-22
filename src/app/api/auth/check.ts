import { TRPCError } from "@trpc/server";

export function requireRole(
  ctx: { session?: { user?: { id?: string; role?: string | null } } },
  requiredRole: string
): string {
  const user = ctx.session?.user;
  if (!user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "User not authenticated" });
  }
  if (user.role !== requiredRole) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" });
  }
  return user.id;
}