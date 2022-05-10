import { IInitialUserState } from "../redux/reducers/user.reducer";
import { IUser } from "./user.interface";

export interface IAction {
    type: string;
}

export interface IActionUser extends IAction {
    payload: IUser;
}

export interface IState {
    user: IInitialUserState;
}

export interface IActionUpdate extends IAction {
    value: string;
}