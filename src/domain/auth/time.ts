export const addDays = (start: Date, days: number): Date => {
  const next = new Date(start);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
};
