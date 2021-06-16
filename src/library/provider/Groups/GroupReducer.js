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
                name: "",
                region: "",
                genres: "",
                contentType: "",
                providerList: [],
                userList: [],
                allCards: [],
                userData: [],
            };
        }
        case ACTIONS.SELECTED_GROUP: {
            return {
                ...state,
                isError: false,
                isLoading: false,
                name: action.payload.name,
                region: action.payload.region,
                genres: action.payload.genres,
                contentType: action.payload.contentType,
                providerList: action.payload.providerList,
                userList: action.payload.userList,
                allCards: action.payload.allCards,
                selectedCards: action.payload.selectedCards,
            };
        }
        default:
            return state;
    }
};

export default reducer;
