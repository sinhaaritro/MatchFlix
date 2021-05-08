import { ACTIONS } from "./AuthConstants";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOGGED_IN: {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                userProfile: action.payload.userProfile,
                isLoading: false,
                isLogin: true,
                isError: false,
            };
        }
        case ACTIONS.LOGGED_OUT: {
            return {
                ...state,
                currentUser: null,
                userProfile: null,
                isLoading: false,
                isLogin: false,
                isError: false,
            };
        }
        case ACTIONS.UPDATE_USER: {
            return {
                ...state,
                userProfile: action.payload.userProfile,
            };
        }
        case ACTIONS.LOADING: {
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        }
        case ACTIONS.ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        default:
            return state;
    }
};

export default reducer;
