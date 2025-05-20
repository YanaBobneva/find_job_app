"use server";

import { $Enums } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

export async function deleteUser(formData: FormData) {
  const fd = z
    .object({
      id: z.string(),
    })
    .parse({
      id: formData.get("id"),
    });
  await db.user.delete({ where: { id: fd.id } });
  redirect("/user");
}

export async function updateUser(formData: FormData) {
  const fd = z
    .object({
      id: z.string(),      
      role: z.nativeEnum($Enums.Role),
    })
    .parse({
      id: formData.get("id"),      
      role: formData.get("role"),
    });
  await db.user.update({ where: { id: fd.id }, data: fd });
  fd.role === "EMPLOYER" ? redirect("/employer/undefined") : redirect("/seeker/undefined");
}