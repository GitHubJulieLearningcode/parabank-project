import { Locator, Page, expect } from '@playwright/test';
export class BasePage{
    constructor(protected page:Page){}
    async click(locator:Locator)
    {
        await locator.click();

    }
    async fill(locator:Locator,value:string)
    {
        await locator.fill(value);
    }
    async verifyVisible(locator:Locator)
    {
        await expect(locator).toBeVisible();

    }













}