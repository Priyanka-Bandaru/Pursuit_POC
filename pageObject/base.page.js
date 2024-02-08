require("dotenv").config();
const actions = require("../utils/actions");
exports.BasePage=class BasePage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.landingPageLogo=page.locator("(//a[@aria-label='Target home'])[1]");
    this.homePageSignBtn=page.locator("(//span[text()='Sign in'])[1]");
    this.homePageSecondSignIn=page.locator("(//span[text()='Sign in'])[2]");
    this.emailTab=page.locator("[id='username']");
    this.passwordTab=page.locator("[name='password']");
    this.signinBtn=page.locator("//button[@id='login']");
    this.welcomeMessage=page.locator("(//span[contains(text(),'Hi')])[1]");
    this.homePageSearchArea=page.locator("//input[@id='search']");
    this.itemSortButton=page.locator("//div[text()='Sort']");
    this.bestSellerItemButton=page.locator("//input[@id='bestselling-best seller']");
    this.sortApplyButton=page.locator("//button[text()='Apply']");
    this.resultItem=page.locator("(//section/div/div[2]//a)[2]");
    this.productText=page.locator("//h1[@id='pdp-product-title-id']");
    this.productAddToCartButton=page.locator("(//button[contains(@id,'addToCartButtonOrTextIdFor')])[1]");
    this.shippingText=page.locator("//h3[text()='Shipping']");
    this.closeCrossBtn=page.locator("//button[@aria-label='close']");
    this.cartButton=page.locator("//a[contains(@aria-label,'cart')]");
    this.itemAtCart=(itemName)=>page.locator("//div[contains(text(),'"+itemName+"')]");
    this.removeItem=(itemName)=>page.locator("(//button[contains(@aria-label,'"+itemName+"')])[3]")
    this.goToHome=page.locator("//a[text()='Go to homepage']");
    this.signoutBtn=page.locator("//span[text()='Sign Out']");
  }

async launchApplication(url){
    await this.page.goto(url);
    await this.page.waitForTimeout(parseInt(process.env.small_wait));
}
async signInIntoApplication(userName,password){
   await actions.executeStep(this.test,this.homePageSignBtn,"click","click on sign button in landing page");
   await actions.executeStep(this.test,this.homePageSecondSignIn,"click","click on sign button in landing page model");
   await actions.executeStep(this.test,this.emailTab,"fill","enter user name",userName);
   await actions.executeStep(this.test,this.passwordTab,"fill","enter password",password);
   await actions.executeStep(this.test,this.signinBtn,"click","click on sign in button");
}

async serachForItem(currentItem){
    await actions.executeStep(this.test,this.homePageSearchArea,"fill","search for "+currentItem+"in sear box",currentItem);
    await this.page.keyboard.press("Enter");
}

async applifiltersToSearch(){
    await actions.executeStep(this.test,this.itemSortButton,"click","click on short button for sort items");
    await actions.executeStep(this.test,this.bestSellerItemButton,"click","click on best seller in sort items");
    await actions.executeStep(this.test,this.sortApplyButton,"click","click in apply sort button")
}

async selectItemToAddCart(){
    await this.page.waitForTimeout(parseInt(process.env.small_wait));
    let curretItemName=await this.resultItem.innerText();
    await actions.executeStep(this.test,this.resultItem,"click","click on result item");
    return curretItemName;
}

async addItemToCart(){
    await actions.executeStep(this.test,this.productAddToCartButton,"click","click on product addto cart button");
}

async verifyItemIsadded(){
    await actions.executeStep(this.test,this.closeCrossBtn,"click","close the shipping model");
    await actions.executeStep(this.test,this.cartButton,"click","open cart item");
}

async removeItemFromCart(itemName){
    await this.page.waitForTimeout(parseInt(process.env.medium_wait));
    await actions.executeStep(this.test,this.cartButton,"click","open cart item");
    await actions.executeStep(this.test,this.removeItem(itemName),"click","remove cart item");
}
async signOutFromApplication(){
    await actions.executeStep(this.test,this.welcomeMessage,"click","Now click on profile");
    await actions.executeStep(this.test,this.signoutBtn,"click","To click on Signout button");
}
};
