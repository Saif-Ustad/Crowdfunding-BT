const authReducer = (state = { authData: null, isAdmin:false ,loading: false, error: false }, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: false }
        case "AUTH_SUCCESS":
            return { ...state, authData: action.data, isAdmin:action.data.isAdmin ,loading: false, error: false }
        case "AUTH_FAIL":
            return { ...state, loading: false, error: true }

        case "LOG_OUT":
            localStorage.clear();
            return { ...state, authData: null, isAdmin:false , loading: false, error: false }

        default:
            return state;
    }
}

export default authReducer;