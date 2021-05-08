export const ACTIONS = {
    LOADING: "LOADING",
    ERROR: "ERROR",
    NO_GROUP_SELECTED: "NO_GROUP_SELECTED",
    SELECTED_GROUP: "SELECTED_GROUP",
};

export const Initial_State = {
    isLoading: false,
    isError: false,
    selectedGroupID: "",
    selectedGroupName: "",
    selectedGroupUserList: [],
    selectedGroupAllCards: [],
    selectedGroupSelectedCards: [],
};
