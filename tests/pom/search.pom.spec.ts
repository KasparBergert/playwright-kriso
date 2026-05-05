/**
 * Part I - Flat tests (no POM)
 * Test suite: Search for Books by Keywords
 *
 * Rules:
 *   - Use only: getByRole, getByText, getByPlaceholder, getByLabel
 *   - No CSS class selectors, no XPath
 *
 * Tip: run `npx playwright codegen https://www.kriso.ee` to discover selectors.
 */
import { test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test.describe.configure({ mode: 'serial' });

let page: Page;
let searchPage: SearchPage;

test.describe('Search for Books by Keywords', () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    searchPage = new SearchPage(page);

    await searchPage.openUrl();
    await searchPage.acceptCookies();
  });

  test.afterAll(async () => {
    await page.context().close();
  });

  test('Test logo is visible', async () => {
    await searchPage.verifyLogo();
  });

  test('Test no products found', async () => {
    await searchPage.searchByKeyword('jaslkfjalskjdkls');
    await searchPage.verifyNoProductsFoundMessage();
  });

  test('Test search results contain keyword', async () => {
    await searchPage.searchByKeyword('tolkien');
    await searchPage.verifyResultsCountMoreThan(1);
    await searchPage.verifyResultsContainKeyword('tolkien');
  });

  test('Test search by ISBN', async () => {
    await searchPage.searchByKeyword('9780307588371');
    await searchPage.verifyBookVisible('Gone Girl');
  });
});
