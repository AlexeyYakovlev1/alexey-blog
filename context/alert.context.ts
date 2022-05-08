import React from "react";
import { IAlertInfo } from "../interfaces/alert.interface";

const AlertContext = React.createContext({
    active: false,
    setActive: (value: boolean | ((active: boolean) => boolean)) => {
        return;
    },
    setInfo: (value: IAlertInfo | ((info: IAlertInfo) => {
        type: "SUCCESS", message: ""
    })) => {
        return;
    },
    info: { type: "", message: "" }
});

export default AlertContext;