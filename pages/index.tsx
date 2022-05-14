import type { NextPage } from "next";
import { useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import Posts from "../components/Posts/Posts";
import Welcome from "../components/Welcome/Welcome";
import { IPost } from "../interfaces/post.interface";
import { IState } from "../interfaces/redux.interface";

const Home: NextPage = (): JSX.Element => {
    const posts: Array<IPost> = useSelector((state: IState) => state.posts.list);

    return (
        <MainLayout>
            <Welcome />
            <div className="container">
                <Posts data={posts} />
            </div>
        </MainLayout>
    );
};

export default Home;