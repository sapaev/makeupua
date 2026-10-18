import{Page} from "@playwright/test"

export class BasePage{

    protected readonly page:Page;
    protected readonly isMobile: boolean;

    constructor(page:Page, isMobile: boolean = false){
        this.page=page;
        this.isMobile = isMobile;
    }


    async navigate(){
      await this.page.goto("/", { waitUntil: "domcontentloaded" });

   }

}