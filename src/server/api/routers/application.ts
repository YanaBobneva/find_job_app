import nodemailer from "nodemailer";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";
import { requireRole } from "~/app/api/auth/check";
import { $Enums } from "@prisma/client";

export const contactRouter = createTRPCRouter({
  sendApplication: protectedProcedure
    .input(z.object({
      employerEmail: z.string().email(),
      vacancyId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // можно только если ты авторизован, если ты соискатель и у тебя заполнен профиль
      const userId = requireRole(ctx, $Enums.Role.SEEKER);
      const seeker = await db.seekerProfile.findUnique({
        where: { userId },
      });
      if (!seeker) {
        throw new Error("Профиль соискателя не найден: Заполните профиль!!!");
      }

      // 2. Настраиваем почтовый транспорт
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        logger: true,
        debug: true,
      });

      // 3. Отправляем письмо работодателю
      await transporter.sendMail({
        from: `"GoWork" <${process.env.SMTP_USER}>`,
        to: input.employerEmail,
        subject: "Отклик на вакансию",
        html: `
          <p>Соискатель: ${seeker.name} ${seeker.surname}</p>
          <p>Ссылка на профиль: <a href="http://localhost:3000/seeker/${seeker.id}" target="_blank" rel="noopener noreferrer">
            http://localhost:3000/seeker/${seeker.id}
          </a></p>
          <p>Email: ${seeker.email}</p>
          <p>Телефон: ${seeker.phoneNumber}</p>
          <p>Сообщение:<br>Меня заинтересовала вакансия: <a href="http://localhost:3000/vacancy/${input.vacancyId}" target="_blank" rel="noopener noreferrer">
            http://localhost:3000/vacancy/${input.vacancyId}
          </a></p>
        `.trim(),
      });


      return { success: true };
    }),
});
