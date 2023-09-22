import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

export const products = new Array(10).fill(null).map((i) => ({
  id: nanoid(),
  name: faker.commerce.productName(),
  images: new Array(4)
    .fill(null)
    .map(() => faker.image.urlLoremFlickr({ category: "product" })),
  price:
    Math.round(
      faker.number.float({ precision: 0.001, max: 100, min: 1 }) * 100
    ) / 100,
}));

export const getProduct = (id: string) => {
  const product = products.find((product) => product.id === id);

  return product;
};
