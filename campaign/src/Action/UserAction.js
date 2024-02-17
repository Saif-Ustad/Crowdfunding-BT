import * as UserAPI from "../API/UserRequest.js";

export const getAllCreatedProjects = (userId) => async(dispatch) => {

    try{
        const {data} = await UserAPI.getAllCreatedProjects(userId);
        dispatch({type: "USER_GET_CREATED_PROJECTS_SUCCESS", data:data});
    }catch(error){
        console.log(error);
        dispatch({type: "USER_GET_CREATED_PROJECTS_FAIL"});
    }

}
export const getAllDonatedProjects = (userId) => async(dispatch) => {

    try{
        const {data} = await UserAPI.getAllDonatedProjects(userId);
        dispatch({type: "USER_GET_DONATED_PROJECTS_SUCCESS", data:data});
    }catch(error){
        console.log(error);
        dispatch({type: "USER_GET_DONATED_PROJECTS_FAIL"});
    }

}

export const addCreatedProject = (userId, newCreatedProject) => async(dispatch) => {

    try{
        const {data} = await UserAPI.addCreatedProject(userId,newCreatedProject );
        dispatch({type: "USER_ADD_CREATED_PROJECT_SUCCESS", data:data});
    }catch(error){
        console.log(error);
        dispatch({type: "USER_ADD_CREATED_PROJECT_FAIL"});
    }

}


export const addDonatedProject = (userId, newDonatedProject) => async(dispatch) => {

    try{
        const data = await UserAPI.addDonatedProject(userId, newDonatedProject);
        console.log(data)
        dispatch({type: "USER_ADD_DONATED_PROJECT_SUCCESS", data:data});
    }catch(error){
        console.log(error);
        dispatch({type: "USER_ADD_DONATED_PROJECT_FAIL"});
    }

}
