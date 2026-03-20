import{test , expect} from '@playwright/test';
import User from '../models/user';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';

test("should be able to register to the todo website" , async({page})=>{
    const { faker } = await import('@faker-js/faker');

    const user = new User(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        'P@ssw0rd'
    );

    const registerPage = new RegisterPage(page);

    await registerPage.load();

    await registerPage.register(user);

    const todoPage = new TodoPage(page);

    const welcomeMessage = todoPage.getWelcomeMessage();
    await expect(welcomeMessage).toBeVisible();

})