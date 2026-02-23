import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { MdCalendarMonth } from "react-icons/md";
import Button from "../components/common/Button";
import { login } from "../auth/authService";
import WindowHeader from "../components/layout/WindowHeader"
import Input from "../components/common/Input"
import "../styles/Input.css"

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ERROR_MAP = {
  "Invalid login credentials": "이메일 또는 비밀번호가 올바르지 않습니다.",
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setError("");
    
    //1차 공백 입력
    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await login({ email, password });
      navigate("/dashboard");
    } catch (err) { //2차 아이디 or 비밀번호 틀릴 시
      setError(ERROR_MAP[err?.message] || "로그인 실패")
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-box">
        <WindowHeader/>
        <div className="login-title">
          <MdCalendarMonth className="calendar-icon" />
          <h1 className="title-name">My DashBoard</h1>
        </div>

        <div className="login-text">
          <p>로그인</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label>이메일</label>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e); 
              }}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <div className="button-row">
            <Button variant="gray" className="btn-full" onClick={handleSubmit} disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </div>
          <div className="button-row">
            <Button variant="skyblue" className="btn-full" onClick={()=>navigate("/signup")} disabled={loading}>
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
