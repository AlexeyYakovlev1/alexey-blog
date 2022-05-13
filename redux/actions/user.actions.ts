import { IUser } from "../../interfaces/user.interface";

export const login = (user: IUser) => {
    return {
        type: "LOG_IN",
        payload: user
    };
};

export const logout = () => {
    return {
        type: "LOG_OUT"
    };
};