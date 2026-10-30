// challenge.helpers.ts

// extracts category ids from preferences DB result
export const extractCategoryIds = (
  preferences: { category_id: number }[]
): number[] => {
  return preferences.map((p) => p.category_id);
};

// extracts completed challenge ids from user_challenges DB result
export const extractCompletedIds = (
  completedChallenges: { challenge_id: number }[]
): number[] => {
  return completedChallenges.map((c) => c.challenge_id);
};

// returns [-1] if no completed ids so notIn query doesnt break
export const safeNotIn = (ids: number[]): number[] => {
  return ids.length > 0 ? ids : [-1];
};

// shapes the final challenge response
export const formatChallenge = (challenge: any) => {
  return {
    ...challenge,
    user_completed: challenge.user_challenges[0]?.completed ?? false,
  };
};

// shapes the reset response when all challenges are completed
export const formatResetChallenge = (challenge: any) => {
  return {
    ...challenge,
    user_completed: true,
    message: 'All challenges completed! Starting over.',
  };
};


// builds the upsert update payload
export const buildCompletedUpdate = () => ({
  completed: true,
  date: new Date(),
});

// builds the upsert create payload
export const buildCompletedCreate = (user_id: string, challenge_id: number) => ({
  user_id,
  challenge_id,
  completed: true,
  date: new Date(),
});

// challenge.helpers.ts

export const formatHistoryRows = (
  rows: {
    completed: boolean | null;  // ← change boolean to boolean | null
    date: Date | null;
    challenges: {
      title: string;
      categories: {
        name: string;
        emoji: string | null;   // ← add | null here too
      } | null;
    };
  }[]
) => {
  return rows.map((uc) => ({
    title: uc.challenges.title,
    category_name: uc.challenges.categories?.name ?? null,
    emoji: uc.challenges.categories?.emoji ?? null,
    completed: uc.completed ?? false,  // ← handle null with fallback
    date: uc.date,
  }));
};