import "../styles/_main.sass";
import type { AppProps } from "next/app";
import React from "react";
import { IAlertInfo } from "../interfaces/alert.interface";
import AlertContext from "../context/alert.context";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [active, setActive] = React.useState<boolean>(false);
    const [info, setInfo] = React.useState<IAlertInfo>({ type: "SUCCESS", message: "" });

    return (
        <AlertContext.Provider value={{ active, setActive, info, setInfo }}>
            <Component {...pageProps} />
        </AlertContext.Provider>
    );
};

export default MyApp;
