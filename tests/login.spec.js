import { test, expect } from "@playwright/test";
import { BasePage } from "../pageObject/base.page";
import { allure } from "allure-playwright";
require("dotenv").config();

test.describe("POC_UI Automation", () => {
  let page;
  let currentItemName;
  let basePageObj;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    basePageObj = new BasePage(page, test);
    await basePageObj.launchApplication(process.env.BASE_URL);
 
      await expect(basePageObj.landingPageLogo).toBeVisible();

    // await basePageObj.signInIntoApplication(
    //   process.env.user_name,
    //   process.env.pass_word
    // );
    //   await expect(basePageObj.welcomeMessage).toBeVisible();
  });

  test("Adding Item to cart based on the preference", async () => {
    await basePageObj.serachForItem("watch");
    await basePageObj.applifiltersToSearch();
    currentItemName = await basePageObj.selectItemToAddCart();
 
      await expect(basePageObj.productText).toHaveText(currentItemName);

    await basePageObj.addItemToCart();

      await expect(basePageObj.shippingText).toBeVisible();

    await basePageObj.verifyItemIsadded();
   
      await expect(
        basePageObj.itemAtCart(currentItemName.slice(0, 10))
      ).toBeVisible();
  
  });

  test("To remove items from the cart ", async () => {
   
      //await expect(basePageObj.welcomeMessage).toBeVisible();

    await basePageObj.removeItemFromCart(currentItemName.slice(0, 10));
  });
  // test("Sign out of the application", async () => {

  //     await expect(basePageObj.welcomeMessage).toBeVisible();

  //   await basePageObj.signOutFromApplication();
  // });
});
