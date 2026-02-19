import Layout from "../components/layout/Layout";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useState,useEffect,useMemo } from "react";
import SummaryCard from "../components/SummaryCard";
import StudyList from "../components/StudyList";
import StudyHistory from "../components/StudyHistory";
import { supabase } from "../lib/supabaseClient";
import {logout} from "../auth/authService";
import StudyChart from"../components/StudyChart"
import { formatMinutes } from "../utils/formatMinutes";
import { getWeekRange } from "../utils/getWeekRange";


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

  const todaySessions = sessions.filter((s) =>
  isToday(s.created_at)
  );

  //하루 공부시간 계산
  const todayTotalMinutes = sessions
  .filter((s) => s.done && isToday(s.created_at))
  .reduce((sum, s) => sum + (Number(s.minutes) || 0), 0);

  const todayTotalTime = formatMinutes(todayTotalMinutes);

  // =====  WEEK RANGE & WEEK SUMMARY =====
  const { start: weekStart, end: weekEnd } = getWeekRange();

  // 1주일 공부시간 합산
  const weekMinutes = sessions
    .filter((s) => {
      const d = new Date(s.created_at);
      return s.done && d >= weekStart && d < weekEnd;
    })
    .reduce((sum, s) => sum + (s.minutes ?? 0), 0);
  const weekTotalTime = formatMinutes(weekMinutes);

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


    for (const s of sessions) {
      if (!s.done) continue;

      const d = new Date(s.created_at);
      if (d < weekStart || d >= weekEnd) continue;

      const jsDay = d.getDay(); 
      const idx = jsDay === 0 ? 6 : jsDay - 1; 

      base[idx].minutes += Number(s.minutes) || 0;
    }

    return base;
  }, [sessions, weekStart, weekEnd]);

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
        <SummaryCard label="오늘 공부시간" value={todayTotalTime} />
        <SummaryCard label="오늘 할 일" value={`${todayTodoCount} 개`} />
        <SummaryCard label="이번주 공부 시간" value={weekTotalTime} />
      </section>

      <section className="list-section">
          <StudyList sessions={todaySessions} setSessions={setSessions} />
          <StudyHistory sessions={sessions}/>
      </section>

      <section className="progress-section">
          <StudyChart data={weeklyData}/>
      </section>


    </Layout>
  );
}
