import faker from 'faker';
import {Message} from '../models';

export const makeFakeMessage = (): Message => {
  return {
    title: faker.random.word(),
    description: faker.random.words(),
  };
};
