import { useNavigate } from "react-router-dom";
import "../styles/login.css"
import { MdCalendarMonth } from "react-icons/md";
import Button from "../components/common/Button";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = ()=>{
        navigate("/dashboard");
    }
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
                    <MdCalendarMonth className="calendar-icon"/>
                    <h1 className="title-name">My DashBoard</h1>
                </div>
                <p>로그인</p>
                
                <div className="login-form">
                    <div className="form-group">
                        <label>이메일</label>
                        <div className="input-wrapper">
                            <input type="email" placeholder="이메일" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <div className="input-wrapper">
                            <input type="password" placeholder="비밀번호" />
                        </div>
                    </div>

                    <div className="button-row">
                        <Button variant="gray" onClick={handleLogin}>Login</Button> 
                    </div>

                </div>
            </div>
        </div>
    );
}