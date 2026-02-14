import Layout from "../components/layout/Layout";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useState,useEffect } from "react";
import SummaryCard from "../components/SummaryCard";
import StudyList from "../components/StudyList";
import StudyPannel from "../components/StudyPannel";
import { supabase } from "../lib/supabaseClient";
import {logout} from "../auth/authService";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async() => {
    await logout();
    navigate("/login");
  };

  // 4번 리스트
  const [sessions,setSessions] = useState([]);

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
          minutes:30,
        }))
      );
    };
    loadTodos();
    },[])

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
