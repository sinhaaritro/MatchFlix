export const ACTIONS = {
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
    UPDATE_USER: "UPDATE_USER",
    LOADING: "LOADING",
    ERROR: "ERROR",
};

export const Initial_State = {
    isLogin: false,
    isLoading: false,
    isError: false,
    currentUser: null,
    userProfile: { groupList: [], username: null },
};
