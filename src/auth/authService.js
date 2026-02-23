import { supabase } from "../lib/supabaseClient"

export async function login({ email, password }){
    const { data, error } = await supabase.auth.signInWithPassword({
        email : email,
        password : password,
    });

    if(error){
        throw new Error(error.message);
    }
    return data; //{user, session}
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
}

export async function getSession(){
    const { data, error } = await supabase.auth.getSession();
    if(error) throw new Error(error.message);
    return data.session; //null or session
}

export async function signup({ email, password, nickname }){
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { nickname },
        },
    });

    if(error) throw error;
    return data;
}