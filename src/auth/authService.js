export async function login({id,password}){
    await new Promise((r)=> setTimeout(r , 400));

    if(id === "1" && password === "1"){
        return {accessToken:"mock-token-abc123", user : { name:"Tese User" } };
    }
    throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
}