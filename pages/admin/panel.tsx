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
import Cookies from "js-cookie";
import AlertContext from "../../context/alert.context";
import { IPost } from "../../interfaces/post.interface";
import LoadContext from "../../context/load.context";
import AdminNav from "../../components/AdminNav/AdminNav";

interface IDataPosts {
    posts: Array<IPost>;
    clear: boolean;
}

const Panel: NextPage = (): JSX.Element => {
    useAdminCheck();

    // state variables
    const [active, setActive] = React.useState<boolean>(false);
    const [idPost, setIdPost] = React.useState<number>(0);
    const [search, setSearch] = React.useState<string>("");
    const [dataPosts, setDataPosts] = React.useState<IDataPosts>({ posts: [], clear: true });
    
    // context variables
    const { setInfo, setActive: setVisible } = React.useContext(AlertContext);
    const { setLoad } = React.useContext(LoadContext); 
    
    // other variables
    const router = useRouter();

    // delete post
    async function deleteHandler() {
        const response = await fetch(`${process.env.API_URL}/posts/remove/${idPost}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        const data = await response.json();

        if (!data.success) {
            setInfo({ type: "WRONG", message: data.message || "Не удается удалить пост" });
            return setVisible(true);
        }

        setInfo({ type: "SUCCESS", message: data.message || "Пост удален" });
        setVisible(true);
    }

    // search post by title
    async function searchHandler(event: any) {
        event.preventDefault();
        setLoad(true);

        if (!search.length) {
            setDataPosts({ posts: [], clear: true });
            return setLoad(false);
        }

        const response = await fetch(`${process.env.API_URL}/posts/find/${search}`, {
            method: "GET"
        });
        const data = await response.json();
        
        if (!data.success) {
            setInfo({ type: "WRONG", message: data.message || "Ошибка при нахождении поста" });
            setVisible(true);
            return setLoad(false);
        }

        setDataPosts({ posts: [{ ...data.post }], clear: false });
        setLoad(false);
    }

    return (
        <MainLayout title="Панель администратора">
            {active && 
            <Modal setActive={setActive}>
                <div className={classes.modal}>
                    <label htmlFor="idPost">Идентификатор поста</label>
                    <Input
                        id="idPost"
                        value={idPost}
                        onChange={(event: any) => setIdPost(event.target.value)}
                        placeholder="Введите идентификатор поста"
                        type="number"
                    />
                    <div className={classes.modalActions}>
                        <Button className={classes.button} disabled={!(idPost > 0)}>Изменить</Button>
                        <Button className={classes.button} disabled={!(idPost > 0)} onClick={deleteHandler}>Удалить</Button>
                    </div>
                </div>
            </Modal>
            }
            <div className={cn(classes.panel, "container")}>
                <header className={classes.header}>
                    <AdminNav />
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
                    <form className={classes.search} onSubmit={searchHandler}>
                        <Input
                            value={search}
                            onChange={(event: any) => setSearch(event.target.value)}
                            type="search"
                            placeholder="Искать пост по заголовку"
                        />
                    </form>
                    <div className={classes.content}>
                        <Posts data={dataPosts.posts} clear={dataPosts.clear} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Panel;