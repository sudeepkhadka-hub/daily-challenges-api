  import prisma from "../db/prisma";

  class categoriesService {
  async createCategories  (categories: { name: string; emoji: string }[]) {
  
    const result = await prisma.$transaction(
    categories.map((cat) =>
      prisma.categories.upsert({
        where: { name: cat.name },
        update: { emoji: cat.emoji },
        create: { name: cat.name, emoji: cat.emoji },
      })
    )
  );
    return result;
  };

  async getCategories() {
    const result = await prisma.categories.findMany({
      orderBy: { id: 'asc' },
      });
      return result;
    }
  };


  export default new categoriesService();