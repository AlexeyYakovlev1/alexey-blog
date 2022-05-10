import type { NextPage } from "next";
import MainLayout from "../../components/Layouts/MainLayout";
import classes from "./Admin.module.sass";
import cn from "classnames";
import Title from "../../components/UI/Title/Title";
import Button from "../../components/UI/Button/Button";
import Link from "next/link";
import Input from "../../components/UI/Input/Input";
import Posts from "../../components/Posts/Posts";
import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import useAdminCheck from "../../hooks/useAdminCheck";

const Panel: NextPage = (): JSX.Element => {
    const [active, setActive] = React.useState<boolean>(false);

    useAdminCheck();

    return (
        <MainLayout title="Панель администратора">
            {active && 
            <Modal setActive={setActive}>
                <div className={classes.modal}>
                    <Input
                        placeholder="Введите идентификатор поста"
                        type="number"
                    />
                    <div className={classes.modalActions}>
                        <Button className={classes.button} disabled>Изменить</Button>
                        <Button className={classes.button} disabled>Удалить</Button>
                    </div>
                </div>
            </Modal>
            }
            <div className={cn(classes.panel, "container")}>
                <header className={classes.header}>
                    <Title tag="h2">Посты</Title>
                    <ul className={classes.actions}>
                        <li className={classes.actionsItem}>
                            <Button className={classes.button}>
                                <Link href={`/write`}>
                                    <a>Написать</a>
                                </Link>
                            </Button>
                        </li>
                        <li className={classes.actionsItem}>
                            <Button
                                onClick={() => setActive(true)}
                                className={classes.button}
                            >
                                Другие функции
                            </Button>
                        </li>
                    </ul>
                </header>
                <div className={classes.body}>
                    <form className={classes.search}>
                        <Input
                            type="search"
                            placeholder="Искать пост по заголовку"
                        />
                    </form>
                    <div className={classes.content}>
                        <Posts />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Panel;