import { IPost } from "../../interfaces/post.interface";
import { IActionPost } from "../../interfaces/redux.interface";

export const add = (post: IPost): IActionPost => {
    return {
        type: "ADD",
        payload: post
    };
};

export const update = (posts: Array<IPost>): IActionPost => {
    return {
        type: "UPDATE",
        payload: posts
    };
};