export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  // roles: RoleEntity[];
  suspendedAt?: Date;
  status: string;
  suspendReason?: string;
  // connections?: ConnectedUserEntity[];
  // tests?: TestEntity[];
  // scaleAnswers?: ScaleAnswerEntity[];
}
