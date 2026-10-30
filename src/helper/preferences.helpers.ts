export const buildPreferenceRows = (
  user_id: string,
  category_ids: number[]
) => {
  return category_ids.map((category_id) => ({ user_id, category_id }));
};


export const extractCategoryIds = (
  rows: { category_id: number }[]
): number[] => {
  return rows.map((row) => row.category_id);
};