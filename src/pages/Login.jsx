import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { MdCalendarMonth } from "react-icons/md";
import Button from "../components/common/Button";
import { login } from "../auth/authService";
import { setToken } from "../auth/token";

export default function Login() {
  const navigate = useNavigate();

  // ✅ 1) 입력 state 추가
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 2) 에러/로딩 state(선택이지만 추천)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // 버튼 클릭 이벤트가 들어오면 preventDefault 의미는 약하지만, 있어도 문제 없음
    e?.preventDefault?.();
    setError("");

    // ✅ 3) 기본 검증
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
        <div className="design-box">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="address-bar"></span>
        </div>

        <div className="login-title">
          <MdCalendarMonth className="calendar-icon" />
          <h1 className="title-name">My DashBoard</h1>
        </div>

        <p>로그인</p>

        <div className="login-form">
          <div className="form-group">
            <label>이메일</label>
            <div className="input-wrapper">
              {/* ✅ 4) input을 state에 연결 */}
              <input
                type="email"
                placeholder="이메일"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <div className="input-wrapper">
              {/* ✅ 5) input을 state에 연결 */}
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit(e); // 엔터 로그인(선택)
                }}
              />
            </div>
          </div>

          {/* ✅ 6) 에러 표시 (CSS 없으면 그냥 글자로라도 뜸) */}
          {error && <p className="login-error">{error}</p>}

          <div className="button-row">
            {/* ✅ 7) 로딩 중 비활성화(버튼 컴포넌트가 disabled 지원하면) */}
            <Button variant="gray" onClick={handleSubmit} disabled={loading}>
              {loading ? "로그인 중..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
