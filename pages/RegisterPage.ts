import { APIRequestContext, Page, BrowserContext, expect } from "@playwright/test";
import User from "../models/user";
import UserApis from "../apis/UserApis";
import config from "../playwright.config";


export default class RegisterPage{

    private page: Page;
    private request ?: APIRequestContext;
    private context ?: BrowserContext ;
    //constructor
    constructor(page :Page, request ? : APIRequestContext , context ? : BrowserContext){
        this.page = page;
        this.request = request;
        this.context = context;
    }
    //Elements
    private get firstNameInput(){
        return '[data-testid="first-name"]';
    }

    private get LastNameInput(){
        return '[data-testid="last-name"]';
    }
    private get emailInput(){
        return '[data-testid="email"]';
    }
    private get passwordInput(){
        return '[data-testid="password"]';
    }
    private get confirmPasswordInput(){
        return '[data-testid="confirm-password"]';
    }
    private get submitButton(){
        return '[data-testid="submit"]';
    }
    async load(){
        await this.page.goto('/signup');
    }

    //Methods or Steps

    async register(user:User){
         await this.page.fill(this.firstNameInput, user.getFirstName());
    await this.page.fill(this.LastNameInput, user.getLastName());
    await this.page.fill(this.emailInput, user.getEmail());
    await this.page.fill(this.passwordInput, user.getPassword());
    await this.page.fill(this.confirmPasswordInput, user.getPassword());
    await this.page.click(this.submitButton);
    }
    async registerUsingApi(user : User){
        const response = await new UserApis(this.request!).register(user)
        
            //set cookies
            const responseBody = await response.json();
            const accessToken = responseBody.access_token;
            const userId = responseBody.userID;
            const fName = responseBody.firstName

            user.setAccessToken(accessToken);
            
            await this.context!.addCookies([
                {
                    name:'access_token',
                    value: accessToken,
                    url:config.use?.baseURL!,
                },
                {
                    name:'userID',
                    value: userId,
                    url:config.use?.baseURL!,
                },
                {
                    name:'firstName',
                    value: fName,
                    url:config.use?.baseURL!,
                },
            ]);
        
            
    }

}