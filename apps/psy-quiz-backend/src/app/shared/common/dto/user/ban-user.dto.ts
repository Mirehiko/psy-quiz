export class BanUserDto {
  readonly userIds: string[];
  readonly reason?: string;
}
