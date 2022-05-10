import "../styles/_main.sass";
import type { AppProps } from "next/app";
import React, { FunctionComponent } from "react";
import { IAlertInfo } from "../interfaces/alert.interface";
import AlertContext from "../context/alert.context";
import { Provider, useDispatch } from "react-redux";
import { compose } from "redux";
import auth from "../http/auth.http";
import { login } from "../redux/actions/user.actions";
import LoadContext from "../context/load.context";
import Cookies from "js-cookie";
import store from "../redux/store";

// for use redux devtools
declare global {
	interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

// i create this wrapper for use redux
const AppWrapper = <T extends Record<string, unknown> & AppProps>(Component: FunctionComponent<T>) => {
    return function AppWrapperComponent(props: T): JSX.Element {
        return (
            <Provider store={store}>
                <Component { ...props } />
            </Provider>
        );
    };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
    const dispatch = useDispatch();
    // states for alert context
    const [active, setActive] = React.useState<boolean>(false);
    const [info, setInfo] = React.useState<IAlertInfo>({ type: "SUCCESS", message: "" });

    // state for load context
    const [load, setLoad] = React.useState<boolean>(false);

    // check user authentication
    React.useEffect(() => {
        async function load() {
            setLoad(true);

            const { data }: any = await auth();
            
            dispatch(login(data.user));
            Cookies.set("token", data.token);
            
            setLoad(false);
        }

        load();

        // eslint-disable-next-line
    }, []);

    return (
        <AlertContext.Provider value={{ active, setActive, info, setInfo }}>
            <LoadContext.Provider value={{ load, setLoad }}>
                <Component {...pageProps} />
            </LoadContext.Provider>
        </AlertContext.Provider>
    );
};

export default AppWrapper(MyApp);