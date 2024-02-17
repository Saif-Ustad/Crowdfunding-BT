import * as AuthAPI from "../API/AuthRequest";

export const signIn = (FormData) => async(dispatch) => {
    
    dispatch({type: "AUTH_START"});
    try{
        const {data} = await AuthAPI.login(FormData);
        dispatch({type: "AUTH_SUCCESS", data:data});
    }catch(error){
        console.log(error);
        dispatch({type: "AUTH_FAIL"});
    }

}

export const signUp = (FormData) => async(dispatch) => {
    
    dispatch({type: "AUTH_START"});
    try{
        const {data} = await AuthAPI.register(FormData);
        dispatch({type: "AUTH_SUCCESS", data:data});
    }catch(error){
        console.log(error.response.data.message);
        dispatch({type: "AUTH_FAIL"});
    }

}

export const logout = ()=> async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
}
  