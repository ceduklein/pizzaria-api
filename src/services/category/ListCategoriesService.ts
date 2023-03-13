import prismaClient from "../../prisma";

class ListCategoriesService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true
      }
    });

    if(!categories)
      throw new Error("Categories not found")
    
    return categories;
  }
}

export { ListCategoriesService };