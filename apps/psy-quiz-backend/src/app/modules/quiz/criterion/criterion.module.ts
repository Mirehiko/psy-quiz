import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CriterionService} from "./criterion.service";
import {CriterionRepository} from "./criterion-repository";
import {CriterionController} from "./criterion.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature(([CriterionRepository])),
    ],
    providers: [CriterionService],
    controllers: [CriterionController],
    exports: [CriterionService]
})
export class CriterionModule {}
