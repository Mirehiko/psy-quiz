import { Connection, Repository } from 'typeorm';
import {Permission} from "./schemas/permission.entity";
import { Constants } from '../../../shared';

export const permissionProviders = [
    {
        provide: Constants.PERMISSION_REPOSITORY,
        useFactory: (connection: Connection) => connection.getRepository(Permission),
        inject: [Constants.DATABASE_CONNECTION],
    },
];

