import { IPost } from "../../interfaces/post.interface";
import Filter from "../Filter/Filter";
import classes from "./Posts.module.sass";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../interfaces/redux.interface";

const PostItem = dynamic(
    () => import("./Post/Post"),
    { loading: () => <span>Loading...</span> }
);

const Posts = (): JSX.Element => {
    const posts: Array<IPost> = useSelector((state: IState) => state.posts.list);

    return (
        <section className={classes.posts}>
            <Filter />
            {posts.length ? <ul className={classes.list}>
                {posts.map((post:IPost) => (
                    <PostItem key={post.id} {...post} />
                ))}
            </ul> : <h1>Постов пока нет...</h1>}
        </section>
    );
};

export default Posts;