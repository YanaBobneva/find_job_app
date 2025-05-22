"use server";

import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

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