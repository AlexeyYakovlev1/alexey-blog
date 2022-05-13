import "../styles/_main.sass";
import type { AppProps } from "next/app";
import React, { FunctionComponent } from "react";
import { IAlertInfo } from "../interfaces/alert.interface";
import AlertContext from "../context/alert.context";
import { Provider, useDispatch } from "react-redux";
import { compose } from "redux";
import auth from "../http/auth.http";
import { login } from "../redux/actions/user.actions";
import { updateTags } from "../redux/actions/tags.actions";
import LoadContext from "../context/load.context";
import Cookies from "js-cookie";
import store from "../redux/store";
import posts from "../http/posts.http";
import { update } from "../redux/actions/posts.actions";
import tags from "../http/tags.http";

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

    // get some data from server
    React.useEffect(() => {
        async function load() {
            setLoad(true);

            const { data: userData }: any = await auth();
            const { data: postsData }: any = await posts();
            const { data: tagsData }: any = await tags();

            if (userData.success) {
                dispatch(login(userData.user));
            }
            
            dispatch(update(postsData.posts));
            dispatch(updateTags(tagsData.tags));
            Cookies.set("token", userData.token);

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