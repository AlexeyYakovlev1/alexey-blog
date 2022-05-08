import MainLayout from "../../components/Layouts/MainLayout";
import classes from "./Admin.module.sass";
import cn from "classnames";
import Title from "../../components/UI/Title/Title";
import type { NextPage } from "next";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

const Auth: NextPage = (): JSX.Element => {
    return (
        <MainLayout title="Авторизация">
            <div className={cn(classes.login, "container")}>
                <header className={classes.loginHeader}>
                    <Title className={classes.title} tag="h2">Вход</Title>
                    <p className={classes.subtitle}>С возвращением! Пожалуйста введите ваши данные ниже.</p>
                </header>
                <form className={classes.form}>
                    <Input
                        className={classes.input}
                        placeholder="Введите вашу почту"
                        type="email"
                    />
                    <Input
                        className={classes.input}
                        placeholder="Введите ваш пароль"
                        type="password"
                    />
                    <Button className={classes.submit} type="submit" disabled>Войти</Button>
                </form>
            </div>
        </MainLayout>    
    );
};

export default Auth;