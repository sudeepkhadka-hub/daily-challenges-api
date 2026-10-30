
// import pool from '../db';
import prisma from '../db/prisma'
import {
  extractCategoryIds,
  extractCompletedIds,
  safeNotIn,
  formatChallenge,
  formatResetChallenge,
  buildCompletedUpdate,
  buildCompletedCreate,
  formatHistoryRows,
} from '../helper/challenge.helpers';
import { any } from 'zod';



class challengeService {
 async getTodayChallenge (user_id: string) {
    const user = await prisma.users.findUnique({
    where: { id: user_id },
    select: { created_at: true }
  });
      if (!user) return null;

  const preferences = await prisma.user_preferences.findMany({
    where: { user_id },
    select: { category_id: true }
  });
const categoryIds = extractCategoryIds(preferences); // ← helper
  if (categoryIds.length === 0) return { error: 'No preferences set' 
 
  };

  const completedChallenges = await prisma.user_challenges.findMany({
    where: { user_id, completed: true },
    select: { challenge_id: true }
  });

  const completedIds = extractCompletedIds(completedChallenges); // ← helper

  
  const challenge = await prisma.challenges.findFirst({
  where: {
      category_id: { in: categoryIds },
      id: { notIn: safeNotIn(completedIds) },
    },
    orderBy: { id: 'asc' },
    include: {
      categories: true,
      user_challenges: {
        where: { user_id },
      },
    },
  });

  if (!challenge) {
    const firstChallenge = await prisma.challenges.findFirst({
      where: { category_id: { in: categoryIds } },
      orderBy: { id: 'asc' },
      include: {
        categories: true,
        user_challenges: { where: { user_id } },
      },
    });
 return firstChallenge ? formatResetChallenge(firstChallenge) : null; // ← helper
  
  }
  return formatChallenge(challenge); // ← helper

};



async markCompleted (user_id: string, challenge_id: number) {
  const challenge = await prisma.challenges.findUnique({
      where: { id: challenge_id },
  });
    
  if (!challenge) return null;

  // Upsert into user_challenges
  const result: any = await prisma.user_challenges.upsert ({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id, 
      },
  },
      update: buildCompletedUpdate(), // ← helper
    create: buildCompletedCreate(user_id, challenge_id), // ← helper
       
});

  return result;
};

async getChallengeHistory (user_id: string)  {
  const result = await prisma.user_challenges.findMany({
    where: { user_id },
    orderBy: { date: 'desc' },
    include: {                      
      challenges: {
        include: {
          categories: true,
          },
      },
    },
  });


  // Shape response to match original SQL output
  return formatHistoryRows(result); // ← helper
};
};

export default new challengeService();
