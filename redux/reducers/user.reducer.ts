import { userData } from "../../data/user.data";
import { IActionUser } from "../../interfaces/redux.interface";
import { IUser } from "../../interfaces/user.interface";

export interface IInitialUserState {
    data: IUser;
    isAuth: boolean;
}

const initialState: IInitialUserState = {
    data: { ...userData },
    isAuth: false
};

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const userReducer = (state = initialState, action: IActionUser) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                data: action.payload,
                isAuth: true
            };
        case LOG_OUT:
            return {
                ...state,
                data: { ...userData },
                isAuth: false
            };
        default:
            return { ...state };
    }
};

export default userReducer;