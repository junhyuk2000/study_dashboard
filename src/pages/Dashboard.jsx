import Layout from "../components/layout/Layout";
import "../styles/Dashboard.css";
import { clearToken } from "../auth/token"
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import StudyList from "../components/StudyList";
import StudyPannel from "../components/StudyPannel";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };
  // 4번 리스트
  const [sessions,setSessions] = useState([]);

  const todayTodoCount = sessions.length;

  return (
    
    <Layout>
      <section className="section-top">
          <h1>Dashboard</h1>
          <Button variant="gray" className="btn-small" onClick={handleLogout}>
            Logout
          </Button>
      </section>
    
      <section className="summary-section">
        <SummaryCard label="오늘 공부시간" value="0분" />
        <SummaryCard label="오늘 할 일" value={`${todayTodoCount}개`} />
        <SummaryCard label="이번주 목표" value="0분" />
      </section>

      <section className="list-section">
          <StudyList sessions={sessions} setSessions={setSessions} />
          <StudyPannel />
      </section>

      <section className="progress-section">이번주 공부 시간 현황</section>
    </Layout>
  );
}
