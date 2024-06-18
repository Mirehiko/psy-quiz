import { Module } from '@nestjs/common';
import { TokenService } from "./token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserToken } from "./schemas/user-token.entity";
import {UserEntity} from "../user/schemas/user.entity";


@Module({
  providers: [TokenService],
  imports: [
    TypeOrmModule.forFeature(([UserToken, UserEntity])),
  ],
  exports: [
    TokenService,
  ]
})
export class TokenModule {}
