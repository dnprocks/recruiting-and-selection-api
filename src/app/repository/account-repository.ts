import Account from '../model/account';

export interface IAccountRepository {
  save(account: Account): Promise<Account>;
  findOneByEmail(param: any): Promise<Account>;
  findOneById(param: any): Promise<Account>;
}

export const dataBaseMock = new Map<string, Account>();

export const accountRepositoryMock: IAccountRepository = {
  save: (account: Account) => {
    return new Promise((resolve, reject) => {
      const newAccount = new Account({ ...account });
      dataBaseMock.set(newAccount.email, newAccount);
      resolve(newAccount);
    });
  },

  findOneByEmail: async (param: any) => {
    return dataBaseMock.get(param.email);
  },

  findOneById: async (param: any) => {
    const key = [...dataBaseMock.entries()]
      .filter(({ 1: v }) => v.id === param)
      .map(([k]) => k);
    return dataBaseMock.get(key[0]);
  },
};
