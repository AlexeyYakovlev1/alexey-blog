import { IPost } from "../../interfaces/post.interface";
import Filter from "../Filter/Filter";
import classes from "./Posts.module.sass";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { IState } from "../../interfaces/redux.interface";
import Title from "../UI/Title/Title";

const PostItem = dynamic(
    () => import("./Post/Post"),
    { loading: () => <span>Loading...</span> }
);

const Posts = (): JSX.Element => {
    const posts: Array<IPost> = useSelector((state: IState) => state.posts.list);

    return (
        <section className={classes.posts}>
            {posts.length ? 
                <React.Fragment>
                    <Filter />
                    <ul className={classes.list}>
                        {posts.map((post:IPost) => (
                            <PostItem key={post.id} {...post} />
                        ))}
                    </ul>
                </React.Fragment>
                : <Title tag="h3" style={{ marginTop: "20px" }}>Постов пока нет...</Title>
            }
        </section>
    );
};

export default Posts;