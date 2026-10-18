import { BasePage } from "./BasePage.js";
import{expect, Locator} from "@playwright/test"


export  class HomePage extends BasePage{


    private readonly tooltipForCustomers:Locator=this.page.locator(".rc-tooltip-inner")
    private readonly acceptPrivacyButton:Locator=this.page.locator(".CookieBanner__button")
    private readonly menuOfCategory:Locator=this.page.locator(".Menu__container");


    private readonly mobileMenuOfCategory:Locator=this.page.locator(".MenuModal__menu");
    private readonly mobileSubMenu:Locator=this.page.locator(".SubMenu__isSelected");
    private readonly burgerMenu:Locator=this.page.locator(".MenuButton__menu ")

 
    

    async openHomePage(){
        await this.navigate();
        await this.acceptPrivacyButton.click()
    }


    async closeTooltipForCustomers(){
        await this.tooltipForCustomers.waitFor({ state: 'visible', timeout: 5000 });
        await this.tooltipForCustomers.locator("span", {hasText:"makeup-close-light-outline"}).click();
        await expect(this.tooltipForCustomers).not.toBeVisible();

    }

    async clickOnCategory(nameOfCategory:string){
        if(this.isMobile){
            await this.burgerMenu.click();
            await this.mobileMenuOfCategory.first().locator("a span").filter({ has: this.page.getByText(nameOfCategory, { exact: true }) }).click();
            await this.mobileSubMenu.locator("a").first().click();        
         } else{
           await this.menuOfCategory.locator("a").filter({ has: this.page.getByText(nameOfCategory, { exact: true }) }).click();
          }
        
    }





}