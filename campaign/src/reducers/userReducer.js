const userReducer = (state = { donatedProjects: null, createdProjects: null , error: false }, action) => {
    switch (action.type) {

        case "USER_GET_CREATED_PROJECTS_SUCCESS":
            return { ...state, createdProjects: action.data, error: false }
        case "USER_GET_CREATED_PROJECTS_FAIL":
            return { ...state, error: true }

        case "USER_GET_DONATED_PROJECTS_SUCCESS":
            return { ...state, donatedProjects: action.data, error: false }
        case "USER_GET_DONATED_PROJECTS_FAIL":
            return { ...state, error: true }    


        case "USER_ADD_CREATED_PROJECT_SUCCESS":
            return { ...state, createdProjects: action.data, error: false }
        case "USER_ADD_CREATED_PROJECT_FAIL":
            return { ...state, error: true }   
            
        case "USER_ADD_DONATED_PROJECT_SUCCESS":
            return { ...state, donatedProjects: action.data, error: false }
        case "USER_ADD_DONATED_PROJECT_FAIL":
            return { ...state, error: true }      

        default:
            return state;
    }
}

export default userReducer;