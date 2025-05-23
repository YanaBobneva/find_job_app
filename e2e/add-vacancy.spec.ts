import { test, expect } from '@playwright/test';

const testVacancy = {
  name: 'Test Vacancy',
  description: 'Test Description',
  city: 'Омск',
  experienceLevel: 'Нет опыта',
  salary: '10000',
}

const employerId = 'cm9wtxfn3000cvwnsjbui7f2c';

test('add vacancy', async ({ page }) => {
  await page.goto('http://localhost:3000/employer/' + employerId);

  await page.getByRole('button', { name: 'Создать вакансию' }).click();

  await page.getByPlaceholder('Название вакансии').fill(testVacancy.name);

  await page.getByPlaceholder('Описание').fill(testVacancy.description);
  await page.getByPlaceholder('Начните вводить...').fill(testVacancy.city);

  await page.locator('span:text-is("Омск")').click();

  await page.locator('select[name="experienceLevel"]').selectOption(testVacancy.experienceLevel);

  await page.getByPlaceholder('Зарплата').fill(testVacancy.salary);

  await page.getByRole('button', { name: 'Создать' }).click();

  await expect(page.getByRole('link', { name: testVacancy.name })).toBeVisible();
});
