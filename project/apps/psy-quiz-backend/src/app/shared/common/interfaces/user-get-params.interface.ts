import { IGetParams, IGetParamsData } from '.';

export interface IUserGetParamsData extends IGetParamsData {
  params: IUserGetParams;
}

export interface IUserGetParams extends IGetParams {
  email?: string;
  roleId?: string;
  roleName?: string;
  checkOnly?: boolean;
}

export interface IQuestionGetParamsData extends IGetParamsData {
  params: IQuestionParams;
}

export interface IQuestionParams extends IGetParams {
  test?: string;
}
