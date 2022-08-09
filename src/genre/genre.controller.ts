import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {Auth} from "../auth/decorators/auth.decorator";
import {IdValidationPipe} from "../pipes/id.validation.pipe";
import {GenreService} from "./genre.service";
import {CreateGenreDto} from "./dto/create-genre.dto";

@Controller('genres')
export class GenreController {
    constructor(private readonly GenreService:GenreService) {
    }

    @Get('by-slug/:slug')
    async beSlug(@Param('slug') slug:string){
        return this.GenreService.bySlug(slug)
    }


    @Get('/collections')
    async getCollections(){
        return this.GenreService.getCollections()
    }

    @Get()
    async getAll(@Query('searchTerm') searchTerm?:string){

        return this.GenreService.getAll(searchTerm)
    }

    @Get(':id')
    @Auth('admin')
    async get(@Param('id', IdValidationPipe) id:string){

        return this.GenreService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(200)
    @Auth('admin')
    async create( ){
        return this.GenreService.create()
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    @HttpCode(200)
    @Auth('admin')
    async update(@Param('id', IdValidationPipe) id:string, @Body() dto:CreateGenreDto ){
        return this.GenreService.update(id, dto)
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth('admin')
    async delete(@Param('id', IdValidationPipe) id:string){
        return this.GenreService.delete(id)
    }
}
