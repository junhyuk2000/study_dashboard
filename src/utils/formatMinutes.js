export const formatMinutes = (totalMinutes) => {
    const total = Number(totalMinutes) || 0;
    const h = Math.floor(total/60);
    const m = total % 60;
    return h > 0 ? `${h}시간 ${m}분` : `${m}분`;
};