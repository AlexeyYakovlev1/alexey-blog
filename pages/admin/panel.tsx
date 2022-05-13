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
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user.actions";
import Cookies from "js-cookie";

const Panel: NextPage = (): JSX.Element => {
    useAdminCheck();

    const [active, setActive] = React.useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();

    function logoutHandler() {
        dispatch(logout());
        Cookies.remove("token");
        router.push("/admin/auth");
    }

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
                    <div className={classes.headerNav}>
                        <Title tag="h2">Навигационная панель</Title>
                        <nav className={classes.headerMenu}>
                            <ul className={classes.headerMenuList}>
                                <li className={cn(classes.headerMenuItem, {
                                    [classes.headerMenuItemActive]: router.pathname === "/admin/panel"
                                })}>
                                    <Link href={`/admin/panel`}>
                                        <a>Панель администратора</a>
                                    </Link>
                                </li>
                                <li className={classes.headerMenuItem}>
                                    <Link href={`/admin/profile`}>
                                        <a>Профиль администратора</a>
                                    </Link>
                                </li>
                                <li
                                    className={classes.headerMenuItem}
                                    onClick={logoutHandler}
                                >
                                    Выйти
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={classes.headerPosts}>
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
                    </div>
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