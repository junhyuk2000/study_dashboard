import { formatMinutes } from "../utils/formatMinutes";
import "../styles/StudyHistory.css"

export default function StudyHistory({ sessions }) {
    const recentDone = (sessions ?? [])
        .filter((s) => s.done)
        .slice(0, 5);


    const toRelativeDay = (iso) => {
    const d = new Date(iso);
    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfThatDay = new Date(d);
    startOfThatDay.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
        (startOfToday - startOfThatDay) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "오늘";
    if (diffDays === 1) return "어제";
    return `${diffDays}일 전`;
    };


return (
  <div className="history-section">
    <h3>최근 기록</h3>

    {recentDone.length === 0 ? (
      <p className="history-empty">아직 완료한 기록이 없어요.</p>
    ) : (
      <ul className="history-list">
        {recentDone.map((s) => (
            <li key={s.id} className="history-item">
                <div className="history-main">
                    <div className="history-left">
                        <span className="history-title">{s.title}</span>
                        <span className="history-badge">{toRelativeDay(s.created_at)}</span>
                    </div>

                    <span className="history-time">{formatMinutes(s.minutes)}</span>
                </div>
            </li>
        ))}
      </ul>
    )}
  </div>
);

}