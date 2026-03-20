import { fa } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import User from '../models/user';
import UserApis from '../apis/UserApis';
import TodoApis from '../apis/TodoApis';
import RegisterPage from '../pages/RegisterPage';
import NewTodoPage from '../pages/NewTodoPage';
import TodoPage from '../pages/TodoPage';

test('should be able to add a todo item', async ({ page , request ,context }) => {
    const { faker } = await import('@faker-js/faker');

    //create user
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'P@ssw0rd'
    )

    //set cookies
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingApi(user);

    //Ui steps to add todo item
    const newTodoPage = new NewTodoPage(page);
    await newTodoPage.load();
    
    await newTodoPage.addNewTask('Learn Playwright');

        
    const todoPage = new TodoPage(page);
    const todoText = await todoPage.getTodoTextByIndex(0);
    expect(todoText).toEqual('Learn Playwright');

})
test('should be able to delete a todo item', async ( { page , request ,context } )=>{
    const { faker } = await import('@faker-js/faker');
    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'P@ssw0rd'
    );
    
    //set cookies
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingApi(user);
    

    const newTodoPage = new NewTodoPage(page , request);
    await newTodoPage.addNewTaskWithApi(user);
    
    const todoPage = new TodoPage(page);
    await todoPage.load();

    await todoPage.getDeleteByIcons(0);

    const DeletedTodo = todoPage.getNoTodosMessage();
    await expect(DeletedTodo).toBeVisible();


})