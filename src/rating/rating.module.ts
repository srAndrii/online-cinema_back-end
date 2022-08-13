import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import {TypegooseModule} from "nestjs-typegoose";
import {UserModel} from "../user/user.model";
import {ConfigModule} from "@nestjs/config";
import {RatingModel} from "./rating.model";
import {MovieModel} from "../movie/movie.model";
import {MovieModule} from "../movie/movie.module";

@Module({
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:RatingModel,
        schemaOptions:{
          collection:'Rating'
        }
      }
    ]),
    MovieModule,
  ],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
