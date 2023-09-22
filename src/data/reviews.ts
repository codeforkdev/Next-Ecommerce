import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

export const reviews = [
  {
    user: {
      id: nanoid(),
      avatar: faker.image.avatar(),
      name: faker.person.fullName(),
      totalReviews: faker.number.int({ max: 32, min: 1 }),
    },
    stars: 4,
    date: faker.date.recent(),
    text: faker.lorem.paragraphs({ min: 1, max: 3 }),
  },
  {
    user: {
      id: nanoid(),
      avatar: faker.image.avatar(),
      name: faker.person.fullName(),
      totalReviews: faker.number.int({ max: 32, min: 2 }),
    },
    stars: 4,
    date: faker.date.recent(),
    text: faker.lorem.paragraphs({ min: 1, max: 3 }),
  },
  {
    user: {
      id: nanoid(),
      avatar: faker.image.avatar(),
      name: faker.person.fullName(),
      totalReviews: faker.number.int({ max: 32, min: 2 }),
    },
    stars: 4,
    date: faker.date.recent(),
    text: faker.lorem.paragraphs({ min: 1, max: 3 }),
  },
];
