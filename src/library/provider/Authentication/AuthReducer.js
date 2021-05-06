import { ACTIONS, Initial_State } from "./AuthConstants";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SIGNUP: {
            console.log(Initial_State.isLogin);
            return state;
        }
        case ACTIONS.LOGIN: {
            return state;
        }
        case ACTIONS.LOGOUT: {
            return state;
        }
        default:
            return state;
    }
};

export default reducer;
