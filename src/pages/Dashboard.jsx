import Layout from "../components/layout/Layout";
import "../styles/Dashboard.css";
import { clearToken } from "../auth/token"
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useState } from "react"

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    
    <Layout>
      <section className="section-top">
          <h1>Dashboard</h1>
          <Button variant="gray" className="btn-small" onClick={handleLogout}>
            Logout
          </Button>      
      </section>
    
      <section className="summary-section">
        <div className="card">
          <p>오늘 공부시간</p>
        </div>
        <div className="card">오늘 할 일</div>
        <div className="card">이번주 목표</div>
      </section>

      <section className="list-section">
        <div className="study-list">오늘 할일 리스트</div>
        <div className="task-list">할일 추가</div>
      </section>

      <section className="progress-section">이번주 공부 시간 현황</section>
    </Layout>
  );
}
