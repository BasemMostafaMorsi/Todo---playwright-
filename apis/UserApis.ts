import { APIRequest, APIRequestContext } from "@playwright/test"
import User from "../models/user";


export default class UserApis{
    private request: APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request;
    }


    async register(user:User){
        return await this.request.post('/api/v1/users/register', {
        data:{
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            password: "123456789",
            
        }

    })
    }
}