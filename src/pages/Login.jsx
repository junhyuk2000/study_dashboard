import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { MdCalendarMonth } from "react-icons/md";
import Button from "../components/common/Button";
import { login } from "../auth/authService";
import { setToken } from "../auth/token";
import WindowHeader from "../components/layout/WindowHeader"
export default function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setError("");

    if (!id || !password) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await login({ id, password });
      setToken(res.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message ?? "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* <div className="design-box">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="address-bar"></span>
        </div> */}
        <WindowHeader/>
        <div className="login-title">
          <MdCalendarMonth className="calendar-icon" />
          <h1 className="title-name">My DashBoard</h1>
        </div>

        <p>로그인</p>

        <div className="login-form">
          <div className="form-group">
            <label>아이디</label>
            <div className="input-wrapper">
              <input
                type="id"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(e); 
                }}
              />
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <div className="button-row">
            <Button variant="gray" className="btn-full" onClick={handleSubmit} disabled={loading}>
              {loading ? "로그인 중..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
