export const getWeekRange = (baseDate = new Date()) => {
  const now = new Date(baseDate);
  const day = now.getDay();

  const diffToMon = day === 0 ? 6 : day - 1;

  const start = new Date(now);
  start.setDate(now.getDate() - diffToMon);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  return { start, end };
};
