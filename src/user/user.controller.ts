import {Body, Controller, Delete, Get, HttpCode, Param, Put, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {Auth} from "../auth/decorators/auth.decorator";
import {UserService} from "./user.service";
import {User} from "./decorators/user.decorator";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {IdValidationPipe} from "../pipes/id.validation.pipe";

@Controller('users')
export class UserController {

    constructor(private readonly UserService:UserService) {
    }

    @Get('profile')
    @Auth()
    async getProfile(@User('_id') _id:string){

        return this.UserService.byId(_id)
    }

    @UsePipes(new ValidationPipe())
    @Put('profile')
    @HttpCode(200)
    @Auth()
    async updateProfile(@User('_id') _id:string, @Body() dto:UpdateUserDto){
        return this.UserService.updateProfile(_id, dto)
    }

    @Get('count')
    @Auth('admin')
    async getCountUsers(){

        return this.UserService.getCount()
    }

    @Get()
    @Auth('admin')
    async getUsers(@Query('searchTerm') searchTerm?:string){

        return this.UserService.getAll(searchTerm)
    }
    @Get(':id')
    @Auth('admin')
    async getUser(@Param('id', IdValidationPipe) id:string){

        return this.UserService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth('admin')
    async updateUser(@Param('id', IdValidationPipe) id:string, @Body() dto:UpdateUserDto){
        return this.UserService.updateProfile(id, dto)
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async deleteUser(@Param('id', IdValidationPipe) id:string){
        return this.UserService.delete(id)
    }

}
