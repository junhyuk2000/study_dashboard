import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../auth/authService";
import Layout from "../components/layout/Layout";
import Button from "../components/common/Button";
import Input from "../components/common/Input"
import "../styles/Signup.css"

export default function Signup () {

    const navigate = useNavigate()

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [nickname, setNickname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = async(e) =>{
        e?.preventDefault?.();
        setError("");

        if (!nickname.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError("모든 항목을 입력해 주세요.");
            return;
        }

        
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;

        if (!passwordRegex.test(password)) {
            setError("비밀번호는 8~16자, 영문/숫자/특수문자를 모두 포함해야 합니다.");
            return;
        }

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            setLoading(true);
            await signup({ email,password, nickname });
            navigate("/login");
        } catch(err) {
            //에러 처리 오류 해결 해야함
            console.log(err.statue,err.message);
            setError("회원가입 실패");
        } finally {
            setLoading(false);
        }
    }

    return(
        <Layout>
            <div className="auth-center">
                <div className="dashboard-page">
                    <div className="signup-form">
                        <div className="signup-header">
                            <h2>회원가입</h2>
                            <p>닉네임과 이메일로 계정을 만들어보세요.</p>
                        </div>
                        <Input
                            type="text"
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit(e);
                            }}
                        />
                        {error && <p className="signup-error">{error}</p>}
                        <Button variant="gray" className="btn-full" onClick={handleSubmit} disabled={loading}>
                            {loading ? "가입 중..." : "회원가입"}
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}