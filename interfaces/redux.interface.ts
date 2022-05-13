import { IInitialPostsState } from "../redux/reducers/posts.reducer";
import { IInitialTagsState } from "../redux/reducers/tags.reducer";
import { IInitialUserState } from "../redux/reducers/user.reducer";
import { IPost, ITag } from "./post.interface";
import { IUser } from "./user.interface";

export interface IAction {
    type: string;
}

export interface IActionUser extends IAction {
    payload: IUser;
}

export interface IState {
    user: IInitialUserState;
    posts: IInitialPostsState;
    tags: IInitialTagsState;
}

export interface IActionUpdate extends IAction {
    value: string;
}

export interface IActionPost extends IAction {
    payload: IPost | Array<IPost>;
}

export interface IActionTag extends IAction {
    payload: ITag | Array<ITag>;
}