import Layout from "../components/layout/Layout";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useState,useEffect,useMemo } from "react";
import SummaryCard from "../components/SummaryCard";
import StudyList from "../components/StudyList";
import StudyPannel from "../components/StudyPannel";
import { supabase } from "../lib/supabaseClient";
import {logout} from "../auth/authService";
import StudyChart from"../components/StudyChart"

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async() => {
    await logout();
    navigate("/login");
  };

  // 4번 리스트
  const [sessions,setSessions] = useState([]);

  // ===== SUPABASE TODOS LOAD =====
  useEffect(()=>{
    const loadTodos = async()=>{
      //로그인 한 사용자 가져오기
      const {
        data:{ user },
      } = await supabase.auth.getUser();

      if(!user) return;
      
      const {data, error} =await supabase
      .from("todos")
      .select("*")
      .order("created_at", {ascending:false});

      if(error) {
        console.error("loadTodos error",data,error);
        return;
      }
      
      setSessions(
        (data ?? []).map((t)=>({
          id:t.id,
          title:t.title,
          done:t.done,
          minutes:t.minutes ?? 30,
          created_at : t.created_at,
        }))
      );
    };
    loadTodos();
    },[])

  // ===== TODAY SUMMARY =====
  const todayTodoCount = sessions
  .filter((s)=>!s.done).length;

  //오늘 공부시간 계산
  const isToday = (iso) =>{
    const d = new Date(iso);
    const now = new Date();

    return(
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const todayMinutes = sessions
  .filter((s)=>s.done && isToday(s.created_at))
  .reduce((sum,s)=>sum + (s.minutes ?? 0),0);


  // =====  WEEK RANGE & WEEK SUMMARY =====
  const startOfWeek = (date) =>{
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    d.setDate(d.getDate()+diff);
    d.setHours(0,0,0,0);
    return d;
  }
  const weekStart = startOfWeek(new Date());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

const weekMinutes = sessions
  .filter((s) => {
    const d = new Date(s.created_at);
    return s.done && d >= weekStart && d < weekEnd;
  })
  .reduce((sum, s) => sum + (s.minutes ?? 0), 0);

  // ===== WEEKLY CHART DATA (sessions → 요일별 minutes) =====
  const weeklyData = useMemo(() => {
    const base = [
      { name: "월", minutes: 0 },
      { name: "화", minutes: 0 },
      { name: "수", minutes: 0 },
      { name: "목", minutes: 0 },
      { name: "금", minutes: 0 },
      { name: "토", minutes: 0 },
      { name: "일", minutes: 0 },
    ];

    const now = new Date();

    // 이번주 월요일 00:00
    const chartWeekStart = new Date(now);
    const day = now.getDay(); // 0=일,1=월...
    const diffToMon = day === 0 ? 6 : day - 1;
    chartWeekStart.setDate(now.getDate() - diffToMon);
    chartWeekStart.setHours(0, 0, 0, 0);

    // 다음주 월요일 00:00
    const chartWeekEnd = new Date(chartWeekStart);
    chartWeekEnd.setDate(chartWeekStart.getDate() + 7);

    for (const s of sessions) {
      if (!s.done) continue;

      const d = new Date(s.created_at);
      if (d < chartWeekStart || d >= chartWeekEnd) continue;

      const jsDay = d.getDay(); // 0=일..6=토
      const idx = jsDay === 0 ? 6 : jsDay - 1; // 월=0..일=6

      base[idx].minutes += Number(s.minutes) || 0;
    }

    return base;
  }, [sessions]);

  // ===== DASHBOARD UI =====
  return (
    
    <Layout>
      <section className="section-top">
          <h1>Dashboard</h1>
          <Button variant="gray" className="btn-small" onClick={handleLogout}>
            Logout
          </Button>
      </section>
    
      <section className="summary-section">
        <SummaryCard label="오늘 공부시간" value={`${todayMinutes} 분`} />
        <SummaryCard label="오늘 할 일" value={`${todayTodoCount} 개`} />
        <SummaryCard label="이번주 목표" value={`${weekMinutes} 분`} />
      </section>

      <section className="list-section">
          <StudyList sessions={sessions} setSessions={setSessions} />
          <StudyPannel />
      </section>

      <section className="progress-section">
          <StudyChart data={weeklyData}/>
      </section>


    </Layout>
  );
}
