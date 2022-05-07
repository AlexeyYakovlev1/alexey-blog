import type { NextPage } from "next";
import MainLayout from "../components/Layouts/MainLayout";
import Posts from "../components/Posts/Posts";
import Welcome from "../components/Welcome/Welcome";

const Home: NextPage = (): JSX.Element => {
    return (
        <MainLayout>
            <Welcome />
            <div className="container">
                <Posts />
            </div>
        </MainLayout>
    );
};

export default Home;