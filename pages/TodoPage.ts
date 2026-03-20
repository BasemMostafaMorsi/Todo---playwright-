import { th } from "@faker-js/faker";
import { Page } from "@playwright/test";

export default class TodoPage{
    private page: Page;

    //constructor
    constructor(page : Page){
        this.page = page;

    }
    //Elements
    private get welcomeMessage(){
        return '[data-testid="welcome"]';
    }
    private get todoItems(){
        return '[data-testid="todo-item"]';
    }
    private get deleteIcons(){
        return '[data-testid="delete"]';
    }
    private get noTodosMessage(){
        return '[data-testid="no-todos"]';
    }
    //Methods or Steps
    getWelcomeMessage(){
        return this.page.locator(this.welcomeMessage);
    }

    async getTodoTextByIndex(index : number){
        return await this.page.locator(this.todoItems).nth(index).innerText();
    }

    async load(){
        return await this.page.goto('/todo');
    }
    
    async getDeleteByIcons(index : number){
        return await this.page.locator(this.deleteIcons).nth(index).click();
    }
     getNoTodosMessage(){
        return this.page.locator(this.noTodosMessage);
    }
}