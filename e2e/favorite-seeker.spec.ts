import { test, expect } from '@playwright/test';

const seekerId = 'cm9xbswg3000vvw1gt4klinbb';
const seekerName = 'Яна'

test('add vacancy', async ({ page }) => {
  await page.goto('http://localhost:3000/seeker/' + seekerId);

  await page.getByRole('button', { name: 'Добавить в избранное' }).click();
  await page.getByTestId('favorite-button').click();
  await expect(page.getByRole('link', { name: seekerName })).toBeVisible();

  await page.getByRole('button', { name: 'Удалить из избранного' }).click();
  await page.getByTestId('favorite-button').click();
  await expect(page.getByRole('link', { name: seekerName })).toBeHidden();
});
