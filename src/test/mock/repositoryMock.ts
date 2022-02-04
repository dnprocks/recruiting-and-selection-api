import Account from '../../app/model/account';
import { IAccountRepository } from '../../app/repository/account-repository';

export const dataBaseMock = new Map<string, object>();

export const repositoryMock: IAccountRepository = {
  save: (account: Account) => {
    return new Promise((resolve, reject) => {
      const newAccount = new Account({ ...account });
      dataBaseMock.set(newAccount.email, newAccount);
      resolve(newAccount);
    });
  },

  findOneByEmail: (param: any) => {
    return dataBaseMock.get(param.email);
  },

  findOneById: function (param: any) {
    throw new Error('Function not implemented.');
  },
};
