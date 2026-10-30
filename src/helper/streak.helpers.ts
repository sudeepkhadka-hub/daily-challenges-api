// streak.helpers.ts

export const toDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isConsecutive = (prev: string, curr: string): boolean => {
  const prevTime = new Date(prev).getTime();
  const currTime = new Date(curr).getTime();
  return currTime - prevTime === 86400000; // exactly 1 day apart
};

export const isValidStreakStart = (lastDate: string): boolean => {
  const today = toDateString(new Date());
  const yesterday = toDateString(new Date(Date.now() - 86400000));
  return lastDate === today || lastDate === yesterday;
};

export const calculateLongestStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;

  let longest = 1;
  let count = 1;

  for (let i = 1; i < dates.length; i++) {
    if (isConsecutive(dates[i - 1]!, dates[i]!)) {
      count++;
      if (count > longest) longest = count;
    } else {
      count = 1;
    }
  }
  return longest;
};

export const calculateCurrentStreak = (dates: string[]): number => {
  if (dates.length === 0) return 0;

  const lastDate = dates[dates.length - 1]!;

  // streak is broken if last completion wasnt today or yesterday
  if (!isValidStreakStart(lastDate)) return 0;

  let currentStreak = 0;
  let day = new Date(lastDate);

  for (let i = dates.length - 1; i >= 0; i--) {
    const expected = toDateString(day);
    if (dates[i] === expected) {
      currentStreak++;
      day = new Date(day.getTime() - 86400000);
    } else {
      break;
    }
  }
  return currentStreak;
};