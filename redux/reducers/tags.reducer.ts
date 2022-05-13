import { ITag } from "../../interfaces/post.interface";
import { IActionTag } from "../../interfaces/redux.interface";

export interface IInitialTagsState {
    list: Array<ITag>;
}

const initialState = {
    list: [{ id: -1, value: "" }]
};

const UPDATE_TAGS = "UPDATE_TAGS";

const tagsReducer = (state = initialState, action: IActionTag) => {
    switch (action.type) {
        case UPDATE_TAGS:
            return {
                ...state,
                list: action.payload
            };
        default:
            return { ...state };
    }
};

export default tagsReducer;