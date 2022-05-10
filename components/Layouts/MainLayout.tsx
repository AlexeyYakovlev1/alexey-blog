import Head from "next/head";
import React from "react";
import AlertContext from "../../context/alert.context";
import LoadContext from "../../context/load.context";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Header/Menu/Menu";
import Alert from "../UI/Alert/Alert";
import Loader from "../UI/Loader/Loader";
import classes from "./Layouts.module.sass";

interface IMainLayoutProps {
    title?: string;
    children: React.ReactNode;
}

const MainLayout = ({ title = "The Alexey Blog", children }: IMainLayoutProps): JSX.Element => {
    const { active, info } = React.useContext(AlertContext);
    const { load } = React.useContext(LoadContext);
    
    if (load) {
        return (
            <div className={classes.loader}>
                <Loader />
            </div>
        );
    }

    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content="blog,programmer,posts,dev" />
                <meta name="description" content="simple blog about alexey yakovlev" />
                <meta charSet="utf-8" />
            </Head>
            <main className={classes.mainLayoutWrapper}>
                <Header />
                <Menu />
                <div className={classes.mainLayoutBody}>
                    {(active && info.message) && <Alert />}
                    {children}
                </div>
                <Footer />
            </main>
        </React.Fragment>
    );
};

export default MainLayout;