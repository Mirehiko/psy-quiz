import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/schemas/user.entity';
import { UserModule } from '../user/user.module';
import { ConnectedUserService } from './connected-user.service';
import { AppGateway } from './gateway.gateway';
import { ConnectedUserEntity } from './schemas/connected-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectedUserEntity, UserEntity]), AuthModule, UserModule, JwtModule],
  providers: [ConnectedUserService, AppGateway],
  exports: [ConnectedUserService, AppGateway]
})
export class GatewayModule {}
