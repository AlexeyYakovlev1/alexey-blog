import { IPost } from "../../interfaces/post.interface";
import { IActionPost } from "../../interfaces/redux.interface";

export interface IInitialPostsState {
    list: Array<IPost>;
}

const initialState: IInitialPostsState = {
    list: []
};

const ADD = "ADD";
const UPDATE = "UPDATE";

export default function postsReducer(state = initialState, action: IActionPost) {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                list: state.list.concat(action.payload)
            };
        case UPDATE:
            return {
                ...state,
                list: action.payload
            };
        default:
            return { ...state };
    }
}