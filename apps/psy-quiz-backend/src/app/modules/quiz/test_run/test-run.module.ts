import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestRunEntity} from "./schemas/test-run.entity";
import {TestRunController} from "./test-run.controller";
import {TestRunService} from "./test-run.service";


@Module({
    imports: [
        TypeOrmModule.forFeature(([TestRunEntity])),
    ],
    providers: [TestRunService],
    controllers: [TestRunController],
    exports: [TestRunService]
})
export class TestRunModule {}
