import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScaleEntity} from "./schemas/scale.entity";
import {ScaleService} from "./scale.service";
import {ScaleController} from "./scale.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature(([ScaleEntity])),
    ],
    providers: [ScaleService],
    controllers: [ScaleController],
    exports: [ScaleService]
})
export class ScaleModule {}
