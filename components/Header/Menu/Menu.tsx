import Link from "next/link";
import { useRouter } from "next/router";
import { connectsMenu, menuItems } from "../../../data/menu.data";
import { IConnectsMenu, IMenu } from "../../../interfaces/menu.interface";
import classes from "./Menu.module.sass";
import cn from "classnames";
import { IState } from "../../../interfaces/redux.interface";
import { useSelector } from "react-redux";

const Menu = (): JSX.Element => {
    const router = useRouter();
    const isAuth = useSelector((state: IState) => state.user.isAuth);

    return (
        <div className={classes.menu}>
            <div className={cn(classes.wrapper, "container")}>
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
                        {isAuth && <li
                            className={cn(classes.navItem, {
                                [classes.navItemActive]: router.pathname === "/admin/profile"
                            })}
                        >
                            <Link href={`/admin/profile`}>
                                <a>Админ</a>
                            </Link>
                        </li>}
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
    );
};

export default Menu;