import MainLayout from "../../components/Layouts/MainLayout";
import classes from "./Admin.module.sass";
import cn from "classnames";
import Title from "../../components/UI/Title/Title";
import type { NextPage } from "next";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import React from "react";
import AlertContext from "../../context/alert.context";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/user.actions";

const Auth: NextPage = (): JSX.Element => {
    const { setInfo, setActive } = React.useContext(AlertContext);
    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({ mode: "onChange" });
    const router = useRouter();
    const dispatch = useDispatch();

    const loginHandler = async(data: any) => {
        const response = await fetch(`${process.env.API_URL}/admins/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const servData = await response.json();

        if (!response.ok) {
            setInfo({ type: "WRONG", message: servData.message || "Ошибка, повторите снова." });
            return setActive(true);
        }

        if (servData.message) {
            setInfo({ type: "SUCCESS", message: servData.message || "Успех." });
            setActive(true);
        } else setActive(false);
        
        reset();
        dispatch(login(servData.user));
        Cookies.set("token", servData.token);
        router.push("/admin/profile");
    };

    return (
        <MainLayout title="Авторизация">
            <div className={cn(classes.login, "container")}>
                <header className={classes.loginHeader}>
                    <Title className={classes.title} tag="h2">Вход</Title>
                    <p className={classes.subtitle}>С возвращением! Пожалуйста введите ваши данные ниже.</p>
                </header>
                <form className={classes.form} onSubmit={handleSubmit(loginHandler)}>
                    <div className={classes.input}>
                        {errors?.email && <span className={classes.inputWrong}>
                            {errors?.email?.message || "Введите корректную почту"}
                        </span>}
                        <Input
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Поле обязательно к заполнению"
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Почта не является корректной"
                                }
                            })}
                            placeholder="Введите вашу почту"
                            type="email"
                        />
                    </div>
                    <div className={classes.input}>
                        {errors?.password && <span className={classes.inputWrong}>
                            {errors?.password?.message || "Введите корректный пароль"}
                        </span>}
                        <Input
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Поле обязательно к заполнению"
                                },
                                minLength: {
                                    value: 10,
                                    message: "Введенные данные не соответствуют минимальной длине пароля"
                                }
                            })}
                            placeholder="Введите ваш пароль"
                            type="password"
                        />
                    </div>
                    <Button className={classes.submit} type="submit" disabled={!isValid}>Войти</Button>
                </form>
            </div>
        </MainLayout>    
    );
};

export default Auth;