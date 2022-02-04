import Account from '../../app/model/account';
import { IAccountRepository } from '../../app/repository/account-repository';

export const dataBaseMock = new Map<string, Account>();

export const repositoryMock: IAccountRepository = {
  save: (account: Account) => {
    return new Promise(resolve => {
      const newAccount = new Account({ ...account });
      dataBaseMock.set(newAccount.email, newAccount);
      resolve(newAccount);
    });
  },

  findOneByEmail: async (param: any) => {
    return dataBaseMock.get(param.email);
  },

  findOneById: async (id: string) => {
    const key = [...dataBaseMock.entries()]
      .filter(({ 1: v }) => v.id === id)
      .map(([k]) => k);
    return dataBaseMock.get(key[0]);
  },
};
