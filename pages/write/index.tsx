import type { NextPage } from "next";
import MainLayout from "../../components/Layouts/MainLayout";
import classes from "./Write.module.sass";
import cn from "classnames";
import Title from "../../components/UI/Title/Title";
import Input from "../../components/UI/Input/Input";
import Image from "next/image";
import Textarea from "../../components/UI/Textarea/Textarea";
import Button from "../../components/UI/Button/Button";
import React from "react";
import { useForm } from "react-hook-form";
import AlertContext from "../../context/alert.context";

const Write: NextPage = () => {
    const { setInfo, setActive } = React.useContext(AlertContext);
    const [photo, setPhoto] = React.useState(false);

    const {
        register, formState: { errors, isValid },
        handleSubmit, reset
    } = useForm({ mode: "onChange" });

    const publishHandler = (data: any) => {
        setInfo({ type: "INFO", message: "Пост опубликован." });
        setActive(true);
        console.log(data);
    };

    return (
        <MainLayout title="Написать пост">
            <div className={cn(classes.write, "container")}>
                <header className={classes.header}>
                    <Title tag="h2" className={classes.title}>Новая запись</Title>
                    <p className={classes.description}>Ниже опишите ваш пост</p>
                </header>
                <form className={classes.form} onSubmit={handleSubmit(publishHandler)}>
                    <div className={classes.input}>
                        {errors?.title && <span className={classes.inputWrong}>
                            {errors?.title?.message || "Введите корректный заголовок"}    
                        </span>}
                        <Input
                            {...register("title", {
                                required: "Поле обязательно к заполнению",
                                minLength: {
                                    value: 5,
                                    message: "Минимальная длина заголовка 5 символов"
                                }
                            })}
                            type="text"
                            placeholder="Введите заголовок"
                        />
                    </div>
                    <div className={classes.formCoverPhoto}>
                        {photo ? <Image
                            src={"/images/coverPhoto.png"}
                            alt="cover photo"
                            layout="responsive"
                            width="100%"
                            height="40px"
                            objectFit="contain"
                        /> : <span>Обложки не выбрано</span>}
                        <Input

                            type="file"
                        />
                    </div>
                    <div className={classes.input}>
                        {errors?.description && <span className={classes.inputWrong}>
                            {errors?.description?.message || "Введите корректный текст"}    
                        </span>}
                        <Textarea
                            {...register("description", {
                                required: "Поле обязательно к заполнению",
                                minLength: {
                                    value: 10,
                                    message: "Минимальная длина описания 10 символов"
                                }
                            })}
                            placeholder="Введите контент поста"
                        />
                    </div>
                    <Button type="submit" disabled={!isValid}>Опубликовать</Button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Write;