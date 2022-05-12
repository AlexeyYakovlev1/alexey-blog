import { IInitialPostsState } from "../redux/reducers/posts.reducer";
import { IInitialUserState } from "../redux/reducers/user.reducer";
import { IPost } from "./post.interface";
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
}

export interface IActionUpdate extends IAction {
    value: string;
}

export interface IActionPost extends IAction {
    payload: IPost | Array<IPost>;
}