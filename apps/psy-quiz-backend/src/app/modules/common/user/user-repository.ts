import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './schemas/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}

// @Injectable()
// export class UserRepository {
// }
