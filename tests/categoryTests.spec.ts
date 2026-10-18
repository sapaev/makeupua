import {test} from "@playwright/test"
import { HomePage } from "../pages/HomePage.ts";
import { CategoriesPage } from "../pages/CategoriesPage.ts";
import { getCategories, getTitles } from "../helpers/categories.ts";



test.describe("Check price filter", ()=>{
      let homePage: HomePage;
      let categoryPage: CategoriesPage;
      
      const categories = getCategories();
      const titles = getTitles();

      let minPriceForFilter:string="50";
      let maxPriceForFilter:string="100";
      let minPriceForChecking:number=50;
      let maxPriceForChecking:number=100;


      test.beforeEach("Open Home Page", async ({page, isMobile})=>{
          homePage=new HomePage(page, isMobile);
          categoryPage=new CategoriesPage(page, isMobile);
          await homePage.openHomePage();

      })


      test("Check min and max price filter ", async ({page, isMobile})=>{

          await homePage.clickOnCategory(categories.perfumery)
          await categoryPage.checkTitleOfCategory(titles.perfumery)
          await categoryPage.checkOfDisplayingSideMenu();

          await categoryPage.typeMinAndMaxPriceInInput(minPriceForFilter, maxPriceForFilter);
          await categoryPage.clickOnSortingButton();
          await categoryPage.selectFromTheCheapestSorting();
          await categoryPage.checkMinPriceOfItem(minPriceForChecking);
          await categoryPage.checkMaxPriceOfItem(maxPriceForChecking);

          await categoryPage.clickOnLastPaginationButton();
          await categoryPage.checkMinPriceOfItem(minPriceForChecking);
          await categoryPage.checkMaxPriceOfItem(maxPriceForChecking);


      })


     
      test("Check min price filter ", async ()=>{
          await homePage.clickOnCategory(categories.perfumery)
          await categoryPage.checkTitleOfCategory(titles.perfumery)
          await categoryPage.checkOfDisplayingSideMenu();

          await categoryPage.typeMinAndMaxPriceInInput(minPriceForFilter);
          await categoryPage.clickOnSortingButton();
          await categoryPage.selectFromTheCheapestSorting();
          await categoryPage.checkMinPriceOfItem(minPriceForChecking);

          await categoryPage.clickOnLastPaginationButton();
          await categoryPage.checkMinPriceOfItem(minPriceForChecking);
      })


    test("Check max price filter ", async ()=>{
          await homePage.clickOnCategory(categories.perfumery)
          await categoryPage.checkTitleOfCategory(titles.perfumery)
          await categoryPage.checkOfDisplayingSideMenu();

          await categoryPage.typeMinAndMaxPriceInInput(undefined, maxPriceForFilter);
          await categoryPage.clickOnSortingButton();
          await categoryPage.selectFromTheCheapestSorting();
          await categoryPage.checkMaxPriceOfItem(maxPriceForChecking);

          await categoryPage.clickOnLastPaginationButton();
          await categoryPage.checkMaxPriceOfItem(maxPriceForChecking);

      })






})