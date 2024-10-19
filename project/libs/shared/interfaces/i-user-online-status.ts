import { OnlineStatus } from '../enums';

export interface IUserOnlineStatus {
  connectionId: string;
  status: OnlineStatus;
  userId?: string;
}

export interface IExtendedUserOnlineStatus extends IUserOnlineStatus {
  users?: IUserOnlineStatus[];
}
