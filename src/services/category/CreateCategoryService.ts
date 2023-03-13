import prismaClient from "../../prisma";

class CreateCategoryService {
  async execute(name: string) {
    if (name === '')
      throw new Error('Invalid category name.');

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: { name }
    });

    if (categoryAlreadyExists)
      throw new Error('Category already exists.');

    const category = await prismaClient.category.create({
      data: { name },
      select :{
        id: true,
        name: true
      }
    });

    return category;
  }
}

export { CreateCategoryService };