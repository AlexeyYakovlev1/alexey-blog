import { IPost } from "../../interfaces/post.interface";
import classes from "./Posts.module.sass";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../interfaces/redux.interface";
import Title from "../UI/Title/Title";
import Loader from "../UI/Loader/Loader";

const PostItem = dynamic(
    () => import("./Post/Post"),
    { loading: () => <Loader /> }
);

interface IPostsProps {
    data: Array<IPost>;
    clear?: boolean;
}

const Posts = ({ data, clear = true }: IPostsProps): JSX.Element => {
    let posts: Array<IPost> = useSelector((state: IState) => state.posts.list);

    if (!clear) posts = data;

    return (
        <section className={classes.posts}>
            {posts.length ? 
                <ul className={classes.list}>
                    {posts.map((post:IPost) => (
                        <PostItem key={post.id} {...post} />
                    ))}
                </ul>
                : <Title tag="h3" style={{ marginTop: "20px" }}>Постов пока нет...</Title>
            }
        </section>
    );
};

export default Posts;