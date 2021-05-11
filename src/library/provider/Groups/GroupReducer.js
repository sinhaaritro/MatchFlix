import { ACTIONS } from "./GroupConstant";

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.LOADING: {
            return { ...state, isLoading: true, isError: false };
        }
        case ACTIONS.ERROR: {
            return { ...state, isError: true, isLoading: false };
        }
        case ACTIONS.NO_GROUP_SELECTED: {
            return {
                ...state,
                isError: false,
                isLoading: false,
                selectedGroupID: "",
                selectedGroupName: "",
                selectedGroupUserList: [],
                selectedGroupAllCards: [],
                selectedGroupSelectedCards: [],
            };
        }
        case ACTIONS.SELECTED_GROUP: {
            return {
                ...state,
                isError: false,
                isLoading: false,
                selectedGroupID: action.payload.selectedGroupID,
                selectedGroupName: action.payload.selectedGroupName,
                selectedGroupUserList: action.payload.selectedGroupUserList,
                selectedGroupAllCards: action.payload.selectedGroupAllCards,
                selectedGroupSelectedCards:
                    action.payload.selectedGroupSelectedCards,
            };
        }
        default:
            return state;
    }
};

export default reducer;
