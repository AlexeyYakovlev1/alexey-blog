import Link from "next/link";
import classes from "./Header.module.sass";
import cn from "classnames";
import Title from "../UI/Title/Title";

const Header = (): JSX.Element => {
    return (
        <header className={classes.header}>
            <div className={cn(classes.body, "container")}>
                <div className={classes.top}>
                    <Title tag="h2">
                        <Link href={`/`}>
                            <a>The Alexey Blog</a>
                        </Link>
                    </Title>
                </div>
            </div>
        </header>
    );
};

export default Header;