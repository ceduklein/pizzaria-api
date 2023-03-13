import prismaClient from "../../prisma";

class ListByCategoryService {
  async execute(category_id: string) {
    
    const products = prismaClient.product.findMany({
      where: { category_id }
    });

    if(!products)
      throw new Error("products not found.")

    return products;
  }
}

export { ListByCategoryService };