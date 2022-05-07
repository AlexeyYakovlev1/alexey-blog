import type { NextPage } from "next";
import Link from "next/link";
import { connectsMenu, menuItems } from "../../data/menu.data";
import { IConnectsMenu, IMenu } from "../../interfaces/menu.interface";
import classes from "./Header.module.sass";
import cn from "classnames";
import { useRouter } from "next/router";
import Title from "../UI/Title/Title";

const Header: NextPage = (): JSX.Element => {
    const router = useRouter();

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
                <div className={classes.down}>
                    <nav className={classes.nav}>
                        <ul className={classes.navList}>
                            {menuItems.map((item:IMenu) => (
                                <li
                                    key={item.link}
                                    className={cn(classes.navItem, {
                                        [classes.navItemActive]: router.pathname === item.link
                                    })}
                                >
                                    <Link href={item.link}>
                                        <a>{item.name}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className={classes.connect}>
                        <span className={classes.connectTitle}>Написать мне</span>
                        <ul className={classes.connectList}>
                            {connectsMenu.map((item:IConnectsMenu) => (
                                <li key={item.link} className={classes.connectItem}>
                                    <Link href={item.link}>
                                        <a><item.img width={24} height={24} /></a>
                                    </Link>
                                </li> 
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;