import type { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import MainLayout from "../components/Layouts/MainLayout";
import Posts from "../components/Posts/Posts";
import Welcome from "../components/Welcome/Welcome";
import { IPost } from "../interfaces/post.interface";
import { IState } from "../interfaces/redux.interface";
import { IDataPosts } from "./admin/panel";

const Home: NextPage = (): JSX.Element => {
    const redPosts: Array<IPost> = useSelector((state: IState) => state.posts.list);
    const [posts, setPosts] = React.useState<IDataPosts>({ posts: redPosts, clear: true });

    console.log(posts);

    return (
        <MainLayout>
            <Welcome />
            <div className="container">
                <Filter setPosts={setPosts} />
                <Posts data={posts.posts} clear={posts.clear} />
            </div>
        </MainLayout>
    );
};

export default Home;