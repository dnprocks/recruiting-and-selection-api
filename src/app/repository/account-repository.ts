import Account from '../model/account';

export interface IAccountRepository {
  save(account: Account): any;
  findOneByEmail(param: any): any;
  findOneById(param: any): any;
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

  findOneByEmail: (param: any) => {
    return dataBaseMock.get(param.email);
  },

  findOneById: function (param: any) {
    const key = [...dataBaseMock.entries()]
      .filter(({ 1: v }) => v.id === param)
      .map(([k]) => k);
    return dataBaseMock.get(key[0]);
  },
};
