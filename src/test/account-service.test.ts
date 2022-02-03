import { faker } from '@faker-js/faker';
import { AccountService } from '../app/service/account-service';
import { dataBaseMock, repositoryMock } from './mock/repositoryMock';

const newAccount = () => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

describe('Create a new account', () => {
  const serviceAccount = new AccountService(repositoryMock);
  const duplicatedEmail = 'test@email.com';
  test('creating a not existing account', async () => {
    const account = await serviceAccount.create({
      ...newAccount(),
      email: duplicatedEmail,
    });
    expect(account).toHaveProperty('id');
  });

  test('creating an existing account', async () => {
    try {
      await serviceAccount.create({
        ...newAccount(),
        email: duplicatedEmail,
      });
    } catch (error) {
      expect(error.message).toStrictEqual('Account already exists.');
    }
  });

  test('persist new accounts', async () => {
    dataBaseMock.clear();
    await serviceAccount.create(newAccount());
    await serviceAccount.create(newAccount());
    await serviceAccount.create(newAccount());
    await serviceAccount.create(newAccount());
    await serviceAccount.create(newAccount());
    expect(5).toBe(dataBaseMock.size);
  });
});
