import prisma from "../db/prisma";
import{buildPreferenceRows}from "../helper/preferences.helpers";
import { extractCategoryIds } from "../helper/preferences.helpers"; 



class preferencesService {

async savePreferences (user_id: string, category_ids: number[]): Promise<void> {
  
    await prisma.$transaction([
    prisma.users.upsert({
      where: { id: user_id },
      update: {},
      create: { id: user_id },
    }),
    prisma.user_preferences.deleteMany({
      where: { user_id },
    }),
    prisma.user_preferences.createMany({
      data: buildPreferenceRows(user_id, category_ids),
    }),
  ]);
};


async getPreferences(user_id: string): Promise<number[]> {
 const result = await prisma.user_preferences.findMany({
  where: { user_id },
    select: { category_id: true },  
      
 });
 return extractCategoryIds(result);
};
}

export default new preferencesService();