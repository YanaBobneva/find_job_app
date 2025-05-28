# Клиент-серверное приложение для поиска работы <img src="https://github.com/user-attachments/assets/0b3c21a3-1d92-4b9b-8dc5-8cc66a9d9bdd" width="50" alt="GoWork" />

Платформа для взаимодействия соискателей и работодателей с возможностью поиска вакансий, откликов и управления профилями.

## ✨ Функционал  
Приложение разработано с разграничением ролей на работадателей (EMPLOYER) и соискателей (SEEKER)
### Для соискателей    
- 🔍 Поиск и фильтрация вакансий  
- 📨 Отклик на вакансии
- 💗 Добавление вакансий в избранное 
- 📂 Личный кабинет с резюме  

### Для работодателей  
- 🏢 Публикация и управление вакансиями  
- ✉️ Просмотр откликов в почте
- 🔍 Поиск и фильтрация соискателей 
- 💗 Добавление соискателей в избранное    

## 🚀 Технологии  
Приложение разработано с использованием T3 stack
- **Frontend**: Next.js, TypeScript, Tailwind  
- **Backend**: tRPC, Prisma  
- **Auth**: NextAuth.js  
- **DB**: PostgreSQL

## 🔐 Аутентификация  
Для аутентификации Используется NextAuth.js с провайдером `EmailProvider`
### 📧 Вход через Email (Magic Link)
Для удобства пользователей реализована аутентификация без пароля:
1. Пользователь вводит email на странице входа
2. Система отправляет письмо с уникальной ссылкой
3. При переходе по ссылке происходит автоматический вход

## 🛠️ Установка и запуск 
1. Склонируйте репозиторий
   ```bash
   git clone https://github.com/YanaBobneva/find_job_app.git
   ```
2. Установите зависимости
   ```bash
   pnpm install
   ```
3. Создайте ".env" файл в корне проекта и добавьте туда следующий код:
   ```bash
   AUTH_SECRET="10ODPIBzZEDdd789POZMVGRF4tmuR0QwKQg3fWgD2fw="
   EMAIL_SERVER=smtp://127.0.0.1:1026
   EMAIL_FROM=noreply@example.com
   DATABASE_URL="postgresql://findjob_user:findjob_pass@127.0.0.1:5433/find_job_app"
   SMTP_USER=bobneva04@mail.ru
   SMTP_PASS=mfRDK4W1AxK51r11p7KJ
   SMTP_HOST=smtp.mail.ru
   SMTP_PORT=465
   ```
4. Откройте docker
5. Запустите контейнеры
   ```bash
   pnpm db:start
   ```
6. Чтобы создать БД с актуальной структурой выполните команду
   ```bash
   pnpm db:generate
   ```
7. Запустите проект
   ```bash
   pnpm dev
   ```
8. Перейдите по ссылке
   ```bash
   http://localhost:3000/
   ```
