import { ITag } from "../../interfaces/post.interface";
import { IActionTag } from "../../interfaces/redux.interface";

export const updateTags = (tags: Array<ITag>): IActionTag => {
    return {
        type: "UPDATE_TAGS",
        payload: tags
    };
};