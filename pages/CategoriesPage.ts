import { BasePage } from "./BasePage.js";
import{expect, Locator} from "@playwright/test"


export  class CategoriesPage extends BasePage{


    private readonly titleOfCategory:Locator=this.page.locator(".CategoryPage__title  h1")
    private readonly sideMenu:Locator=this.page.locator(".Filters__filters ");
    private readonly priceInput:Locator=this.page.locator(".PriceSelector__field input");
    private readonly sortingItemsButton:Locator=this.page.locator(".SortingMenu__button")
    private readonly sortingMenuOptions:Locator=this.page.locator(".SortingMenu__options")

    private readonly actualPriceOfItem:Locator=this.page.locator(".Products__cards > .ProductCard__cardContainer .Price__priceCurrent")
    private readonly paginationButton:Locator=this.page.locator(".Pagination__pages li")
     private readonly sortingMenuOptionsMobile:Locator=this.page.locator("#SortingList .SortingListContent__options ")
    



   private readonly filterButtonOnMobile:Locator=this.page.locator(".CategoryPage__sorting  .FilterSortingControls__button")
   private readonly sortingItemsButtonOnMobile:Locator=this.page.locator(".CategoryPage__sorting  .FilterSortingControls__button")
   private readonly applyFilterButton:Locator=this.page.locator(".Button__primary ").filter({has:this.page.locator("span", {hasText:"Застосувати"})})
    

    
    
    async checkTitleOfCategory(titleName:string){
       await expect(this.titleOfCategory).toHaveText(titleName);
    }

    async checkOfDisplayingSideMenu(){
        if(this.isMobile){
           await this.filterButtonOnMobile.first().click();
        }else{
          await expect(this.sideMenu).toBeVisible();
        }
        
    }


     

    async typeMinAndMaxPriceInInput(minPrice?: string, maxPrice?: string){

    const minPriceInput: Locator = this.priceInput.first();
    const maxPriceInput: Locator = this.priceInput.last();


     const filteredProductsLoaded = this.page.waitForResponse(response =>
        response.url().includes("/products/?") &&
        (minPrice === undefined || response.url().includes(`priceFrom=${minPrice}`)) &&
        (maxPrice === undefined || response.url().includes(`priceTo=${maxPrice}`))
    );

    await expect(async () => {
        if(minPrice !== undefined){
            await minPriceInput.fill(minPrice);
            await minPriceInput.blur();
        }
        if(maxPrice !== undefined){
            await maxPriceInput.fill(maxPrice);
            await maxPriceInput.blur();
        }

        if(minPrice !== undefined){
            await expect(this.page).toHaveURL(new RegExp(`price_from=${minPrice}`), { timeout: 2000 });
        }
        if(maxPrice !== undefined){
            await expect(this.page).toHaveURL(new RegExp(`price_to=${maxPrice}`), { timeout: 2000 });
        }
    }).toPass({ timeout: 10000 });


    await filteredProductsLoaded;

    if(this.isMobile){
        await this.applyFilterButton.click();
        await expect(this.sideMenu).toBeHidden();
    }
}



    async clickOnSortingButton(){
        if(this.isMobile){
            await this.sortingItemsButtonOnMobile.last().click()
            await expect(this.sortingMenuOptionsMobile).toBeVisible();
   
        } else{
            await this.sortingItemsButton.click();
            await expect(this.sortingMenuOptions).toBeVisible();
        }
        

        
    }

    async selectFromTheCheapestSorting(){
     if(this.isMobile){
        let typeOfSorting:Locator=this.sortingMenuOptionsMobile.locator("button").nth(2);
       await expect(typeOfSorting).toHaveText("Від найдешевших", { ignoreCase: true });
       await typeOfSorting.click();

       await expect(async () => {
          const priceStrings = await this.actualPriceOfItem.allTextContents();
          const actualPrices: number[] = priceStrings.map(str => {
              const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.');
              return parseFloat(cleaned);
          });
          const expectedPrices = actualPrices.slice().sort((a, b) => a - b);
          expect(actualPrices).toEqual(expectedPrices);
        }).toPass({ timeout: 10000 });
     } else {
       let typeOfSorting:Locator=this.sortingMenuOptions.locator("button").nth(2);
       await expect(typeOfSorting).toHaveText("Від найдешевших", { ignoreCase: true });
       await typeOfSorting.click();

       await expect(async () => {
          const priceStrings = await this.actualPriceOfItem.allTextContents();
          const actualPrices: number[] = priceStrings.map(str => {
              const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.');
              return parseFloat(cleaned);
          });
          const expectedPrices = actualPrices.slice().sort((a, b) => a - b);
          expect(actualPrices).toEqual(expectedPrices);
        }).toPass({ timeout: 10000 });
     }


       
    }







    async checkMinPriceOfItem(minPrice:number){
        await expect(async () => {
          const priceStrings = await this.actualPriceOfItem.allTextContents();
          const actualPrices: number[] = priceStrings.map(str => {
              const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.');
              return parseFloat(cleaned);
          });
          expect(actualPrices.every((price)=> price >= minPrice)).toBe(true);
        }).toPass({ timeout: 10000 });
    }

    async checkMaxPriceOfItem(maxPrice:number){
        await expect(async () => {
         const priceStrings = await this.actualPriceOfItem.allTextContents();

         const actualPrices: number[] = priceStrings.map(str => {
              const cleaned = str.replace(/[^\d.,]/g, '').replace(',', '.');
              return parseFloat(cleaned);
          });

          expect(actualPrices.every((price)=> price <= maxPrice)).toBe(true);
        }).toPass({ timeout: 10000 });
    }



    async clickOnLastPaginationButton(){
        let lastPaginationButton:Locator=this.paginationButton.last();
        await lastPaginationButton.click();
    }





}