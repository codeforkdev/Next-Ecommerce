import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

export let product = {
  id: nanoid(),
  name: faker.commerce.productName(),
  shortDescription: faker.lorem.paragraph({ max: 3, min: 1 }),
  longDescription: faker.lorem.paragraph({ max: 10, min: 1 }),
  images: new Array(4)
    .fill(null)
    .map(() => faker.image.urlLoremFlickr({ category: "product" })),
  price:
    Math.round(
      faker.number.float({ precision: 0.001, max: 100, min: 1 }) * 100
    ) / 100,
  stars: 4,
};

export let relatedProducts = [
  {
    id: nanoid(),
    name: faker.commerce.productName(),
    shortDescription: faker.lorem.paragraph({ max: 3, min: 1 }),
    longDescription: faker.lorem.paragraph({ max: 10, min: 1 }),
    images: new Array(4)
      .fill(null)
      .map(() => faker.image.urlLoremFlickr({ category: "product" })),
    price:
      Math.round(
        faker.number.float({ precision: 0.001, max: 100, min: 1 }) * 100
      ) / 100,
    stars: 4,
  },
  {
    id: nanoid(),
    name: faker.commerce.productName(),
    shortDescription: faker.lorem.paragraph({ max: 3, min: 1 }),
    longDescription: faker.lorem.paragraph({ max: 10, min: 1 }),
    images: new Array(4)
      .fill(null)
      .map(() => faker.image.urlLoremFlickr({ category: "product" })),
    price:
      Math.round(
        faker.number.float({ precision: 0.001, max: 100, min: 1 }) * 100
      ) / 100,
    stars: 4,
  },
  {
    id: nanoid(),
    name: faker.commerce.productName(),
    images: new Array(4)
      .fill(null)
      .map(() => faker.image.urlLoremFlickr({ category: "product" })),
    price:
      Math.round(
        faker.number.float({ precision: 0.001, max: 100, min: 1 }) * 100
      ) / 100,
    stars: 4,
  },
];
