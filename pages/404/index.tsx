import type { NextPage } from "next";
import Link from "next/link";
import MainLayout from "../../components/Layouts/MainLayout";
import Button from "../../components/UI/Button/Button";
import Title from "../../components/UI/Title/Title";
import classes from "./Error.module.sass";
import cn from "classnames";

const Error: NextPage = (): JSX.Element => {
    return (
        <MainLayout title="Страница не найдена">
            <div className={cn(classes.error, "container")}>
                <header className={classes.header}>
                    <Title tag="h2" className={classes.title}>Страница не найдена</Title>
                    <p className={classes.description}>Извините, но страница, которую вы запросили не может быть найдена.</p>
                </header>
                <Button>
                    <Link href={`/`}>
                        <a>На главную</a>
                    </Link>
                </Button>
            </div>
        </MainLayout>
    );
};

export default Error;