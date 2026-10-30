
import prisma from '../db/prisma';

import {
  calculateLongestStreak,
  calculateCurrentStreak,
} from '../helper/streak.helpers';


interface StreakResult {
  current_streak: number;
  longest_streak: number;
}

class streakService {

async getStreak (user_id: string): Promise<StreakResult> {
  const result = await prisma.user_challenges.findMany({
  where: {
    user_id,
    completed: true,
  },
  select: { date: true },
  orderBy: { date: 'asc' },
  distinct: ['date'],
});
const dates = result.map((row: { date: Date | null }) => row.date!.toISOString().split('T')[0]);

  if (dates.length === 0) {
    return { current_streak: 0, longest_streak: 0 };
  }



return {
    current_streak: calculateCurrentStreak(dates),
    longest_streak: calculateLongestStreak(dates),
  };
};
};
export default new streakService();