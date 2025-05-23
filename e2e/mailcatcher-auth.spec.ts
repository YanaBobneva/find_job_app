import { test, expect } from '@playwright/test';

test('auth via magic link using MailCatcher', async ({ page, context }) => {
  // 1. Отправляем email
  await page.goto('http://localhost:3000/api/auth/signin');
  await page.fill('input[type="email"]', 'rzd@mail.ru');
  await page.getByText('Sign in').click();

  // 2. Ждём появление письма в MailCatcher (поднимается на http://localhost:1080)
  const getLastEmail = async () => {
    const res = await fetch('http://localhost:1081/messages');
    const messages = await res.json();
    return messages[messages.length - 1];
  };

  let email;
  for (let i = 0; i < 10; i++) {
    email = await getLastEmail();
    if (email) break;
    await new Promise((res) => setTimeout(res, 1000));
  }

  if (!email) throw new Error('Письмо не пришло');

  // 3. Получаем содержимое письма
  const res = await fetch(`http://localhost:1081/messages/${email.id}.plain`);
  const body = await res.text();

  // 4. Ищем ссылку (можно подрегулировать регэксп под твою ссылку)
  const link = body.match(/https?:\/\/[^\s]+/)?.[0];
  if (!link) throw new Error('Ссылка входа не найдена в письме');

  // 5. Переход по ссылке
  await page.goto(link);

  // 7. Сохраняем сессию
  await context.storageState({ path: 'auth/storageState.json' });
});
