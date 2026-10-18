import {test} from "@playwright/test"
import { HomePage } from "../pages/HomePage.ts";
import { CategoriesPage } from "../pages/CategoriesPage.ts";
import { getCategories, getTitles } from "../helpers/categories.ts";



test.describe("Check price filter", ()=>{
      let homePage: HomePage;
      let categoryPage: CategoriesPage;
      
      const categories = getCategories();
      const titles = getTitles();


      test.beforeEach("Open Home Page", async ({page, isMobile})=>{
          homePage=new HomePage(page, isMobile);
          categoryPage=new CategoriesPage(page, isMobile);
          await homePage.openHomePage();

      })


      test("Check min and max price filter", async ()=>{
          await homePage.clickOnCategory(categories.perfumery);
          await categoryPage.checkTitleOfCategory(titles.perfumery);
          const { min, max } = await categoryPage.getPriceRangeFromPage();
          await categoryPage.checkOfDisplayingSideMenu();

          await categoryPage.typeMinAndMaxPriceInInput(String(min), String(max));
          await categoryPage.clickOnSortingButton();
          await categoryPage.selectFromTheCheapestSorting();
          await categoryPage.checkMinPriceOfItem(min);
          await categoryPage.checkMaxPriceOfItem(max);

          if (await categoryPage.clickOnLastPaginationButton()) {
              await categoryPage.checkMinPriceOfItem(min);
              await categoryPage.checkMaxPriceOfItem(max);
          }
      })

      test("Check min price filter", async ()=>{
          await homePage.clickOnCategory(categories.perfumery);
          await categoryPage.checkTitleOfCategory(titles.perfumery);
          const { min } = await categoryPage.getPriceRangeFromPage();
          await categoryPage.checkOfDisplayingSideMenu();

          await categoryPage.typeMinAndMaxPriceInInput(String(min));
          await categoryPage.clickOnSortingButton();
          await categoryPage.selectFromTheCheapestSorting();
          await categoryPage.checkMinPriceOfItem(min);

          if (await categoryPage.clickOnLastPaginationButton()) {
              await categoryPage.checkMinPriceOfItem(min);
          }
      })

      test("Check max price filter", async ()=>{
          await homePage.clickOnCategory(categories.perfumery);
          await categoryPage.checkTitleOfCategory(titles.perfumery);
          const { max } = await categoryPage.getPriceRangeFromPage();
          await categoryPage.checkOfDisplayingSideMenu();

          await categoryPage.typeMinAndMaxPriceInInput(undefined, String(max));
          await categoryPage.clickOnSortingButton();
          await categoryPage.selectFromTheCheapestSorting();
          await categoryPage.checkMaxPriceOfItem(max);

          if (await categoryPage.clickOnLastPaginationButton()) {
              await categoryPage.checkMaxPriceOfItem(max);
          }
      })






})