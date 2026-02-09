import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const handleLogin = ()=>{
        navigate("/dashboard");
    }
    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>login</button>
        </div>
    );
}