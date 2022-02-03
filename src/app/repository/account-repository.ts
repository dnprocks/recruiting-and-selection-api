import Account from '../model/account';

export interface IAccountRepository {
  save(account: Account): any;
  findOne(param: any): any;
}

export const dataBaseMock = new Map<string, object>();

export const repositoryMock: IAccountRepository = {
  save: (account: Account) => {
    return new Promise((resolve, reject) => {
      const newAccount = new Account({ ...account });
      dataBaseMock.set(newAccount.email, newAccount);
      resolve(newAccount);
    });
  },

  findOne: (param: any) => {
    return dataBaseMock.get(param.email);
  },
};
