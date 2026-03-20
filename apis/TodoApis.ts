import { APIRequestContext } from '@playwright/test';
import User from '../models/user';

export default class TodoApis{

    private request: APIRequestContext;

        constructor(request: APIRequestContext){
            this.request = request;
        }

    async addTodo(user:User){
        
        return await this.request.post('/api/v1/tasks', {
        data:{
            isCompleted: false,
            item: "playWrite"
        },
        headers:{
            Authorization: `Bearer ${user.getAccessToken()}`
        }
    })
    }
}