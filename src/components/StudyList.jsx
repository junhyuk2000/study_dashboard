import Button from "./common/Button";
import { useState } from "react";
import "../styles/StudyList.css"
import { supabase } from "../lib/supabaseClient";


export default function StudyList({ sessions, setSessions }) {

    const [isAdding,setIsAdding] = useState(false);
    const [title,setTitle] = useState("");

    //리스트 아이템 추가
    const addSession = async() => {
        const trimmed = title.trim();
        if (!trimmed) return;

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
            console.error("getUser error", userError);
            return;
        }
        if (!user) {
            console.error("No user (not logged in)");
            return;
        }

        const { data, error } = await supabase
        .from("todos")
        .insert([
            {
                title:trimmed,
                done:false,
                user_id:user.id,
            },
        ])
        .select()
        .single();

        if(error){
            console.error("insert error",error);
            return;
        }

        setSessions((prev)=>[
            {
                id:data.id,
                title:data.title,
                done:data.done,
                minutes:30,
            },
            ...prev,
        ])
        setTitle("");

    };


    // 리스트 아이템 삭제
    const removeSession = async(id) =>{
        const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id",id);

        if(error) {
            console.error("delete error:",error);
            return;
        }
        setSessions(prev=>prev.filter(item=>item.id !== id))
    }
    // 체크박스 토글
    const toggleDone = async(id,nextDone) =>{
        const { error } = await supabase
        .from("todos")
        .update({ done:nextDone })
        .eq("id",id);

        if(error) {
            console.error("update error:",error);
            return;
        }
        
        setSessions((prev)=>
        prev.map((item)=>
            item.id === id ? { ...item, done: nextDone } : item )
        );
    };
    

  return (
    <>
        <div className="study-list">
            <span>오늘 할일 리스트</span>
            <Button variant="gray" className="btn-add" onClick={()=> setIsAdding((prev)=>!prev)}>
            + add
            </Button>

            {isAdding && (
                <div className="task-input-row">
                    <input
                    className="task-input"
                    value={title}
                    placeholder="할 일을 입력하세요"
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {if (e.key === "Enter") addSession();}}
                    />
                    <Button
                        variant="gray"
                        className="btn-add-confirm"
                        onClick={addSession}
                    >
                    추가
                    </Button>
                </div>
            )}
        <ul className="todo-list">
            {sessions.map((item) => (
                <li 
                key={item.id}
                className={item.done ? "todo-item done" : "todo-item"}
                >
                    <div className="todo-left">
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={(e)=>toggleDone(item.id, e.target.checked)}
                        />
                        {item.title}
                    </div>
                    <Button variant="gray" className="btn-delete" onClick={() => removeSession(item.id)}            >
                    삭제
                    </Button>
                </li>
            ))}
        </ul>
        </div>
    </>
  );
}
