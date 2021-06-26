export const ACTIONS = {
    LOADING: "LOADING",
    ERROR: "ERROR",
    NO_GROUP_SELECTED: "NO_GROUP_SELECTED",
    SELECTED_GROUP: "SELECTED_GROUP",
};

export const Initial_State = {
    isLoading: false,
    isError: false,
    allCards: [],
    name: "",
    region: "",
    genres: "",
    contentType: "",
    providerList: [],
    userList: {},
    selectedCards: [],
};

// data = {
// groupName: newGroupName,
// selectedGroupRegion: groupState.selectedGroupRegion,
// allCard: groupState.selectedGroupAllCards,
// selectedCard: groupState.selectedGroupSelectedCards,
// userSelectedCard: groupState.selectedGroupUserList,
// };
