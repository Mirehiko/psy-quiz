import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestEntity} from "./schemas/test.entity";
import {TestService} from "./test.service";
import {TestController} from "./test.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature(([TestEntity])),
    ],
    providers: [TestService],
    controllers: [TestController],
    exports: [TestService]
})
export class TestModule {}
