import { Page, APIRequestContext } from '@playwright/test';
import TodoApis from '../apis/TodoApis';
import User from '../models/user';

export default class NewTodoPage{
    private page: Page;
    private request ?: APIRequestContext;
    constructor(page : Page, request ?: APIRequestContext){
        this.page = page;
        this.request = request;
    }

    private get newTodoInput(){
        return '[data-testid="new-todo"]';
    }
    private get newTodoSubmitButton(){
        return '[data-testid="submit-newTask"]';
    }

    async load(){
        await this.page.goto('/todo/new');
    }

    async addNewTask(todo : string){
        await this.page.fill(this.newTodoInput, todo);
        await this.page.click(this.newTodoSubmitButton);
    }

    async addNewTaskWithApi(user :User){
        return await new TodoApis(this.request!).addTodo(user);
    }
}