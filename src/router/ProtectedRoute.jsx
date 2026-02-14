import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient"

export default function ProtectedRoute({children}){
    const [checking,setChecking] = useState(true);
    const [authed, setAuthed] = useState(false);

    useEffect(()=>{
        const check = async()=>{
            const { data } = await supabase.auth.getSession();
            setAuthed(!!data.session);
            setChecking(false);
        };

        check();

        const { data:sub } = supabase.auth.onAuthStateChange((_event, session)=>{
            setAuthed(!!session);
            setChecking(false);
        });

        return() => sub.subscription.unsubscribe();

    },[]);

    if(checking) return null;
    if(!authed) return <Navigate to="/login" replace />;
    
    return children;
}
