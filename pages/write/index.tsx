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

const Write: NextPage = () => {
    const [photo, setPhoto] = React.useState(false);

    return (
        <MainLayout title="Написать пост">
            <div className={cn(classes.write, "container")}>
                <header className={classes.header}>
                    <Title tag="h2" className={classes.title}>Новая запись</Title>
                    <p className={classes.description}>Ниже опишите ваш пост</p>
                </header>
                <form className={classes.form}>
                    <Input
                        type="text"
                        placeholder="Введите заголовок"
                    />
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
                    <Textarea
                        placeholder="Введите контент поста"
                    />
                    <Button type="submit" disabled>Опубликовать</Button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Write;