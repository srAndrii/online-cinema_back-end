import {Controller, Get} from '@nestjs/common';
import {Auth} from "../auth/decorators/auth.decorator";
import {UserService} from "./user.service";
import {User} from "./decorators/user.decorator";

@Controller('users')
export class UserController {

    constructor(private readonly UserService:UserService) {
    }

    @Get('profile')
    @Auth()
    async getProfile(@User('_id') _id:string){

        return this.UserService.byId(_id)
    }

}
