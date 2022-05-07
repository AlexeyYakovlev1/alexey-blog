import { NextPage } from "next";
import { IPost } from "../../interfaces/post.interface";
import Filter from "../Filter/Filter";
import classes from "./Posts.module.sass";
import dynamic from "next/dynamic";
import React from "react";

const PostItem = dynamic(
    () => import("./Post/Post"),
    { loading: () => <span>Loading...</span> }
);

const Posts: NextPage = (): JSX.Element => {
    const posts: Array<IPost> = [
        {
            id: 2,
            title: "Владилен Минин о своих курсах по веб-разработке и опыте использования WebStorm",
            description: `Запись видео имеет свою специфику. Большинство использует бесплатные продукты, чтобы быть ближе к пользователям, ведь получить доступ к бесплатному продукту может каждый. В каких-то ситуациях я тоже использую VS Code. Как правило, это случается чисто интуитивно, когда мне кажется, что пользователям так будет удобнее.
В целом же WebStorm мне нравится больше как визуально, так и по функциональности, поэтому я использую его для записи своих видео и курсов в большинстве случаев. Так как я сам доволен продуктом, мне хочется, чтобы моя аудитория тоже об этом знала и пользовалась им, если есть такая возможность.`,
            owner: 1,
            tag: 0
        }
    ];

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