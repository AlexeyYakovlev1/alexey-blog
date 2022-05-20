import classes  from "./AdminNav.module.sass";
import Title from "../UI/Title/Title";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user.actions";
import Cookies from "js-cookie";

const AdminNav = (): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    // logout admin
    function logoutHandler() {
        dispatch(logout());
        Cookies.remove("token");
        router.push("/admin/auth");
    }

    return (
        <div className={classes.adminNav}>
            <Title tag="h2">Навигационная панель</Title>
            <nav className={classes.adminMenu}>
                <ul className={classes.adminMenuList}>
                    <li className={cn(classes.adminMenuItem, {
                        [classes.adminMenuItemActive]: router.pathname === "/admin/panel"
                    })}>
                        <Link href={`/admin/panel`}>
                            <a>Панель администратора</a>
                        </Link>
                    </li>
                    <li className={classes.adminMenuItem}>
                        <Link href={`/admin/profile`}>
                            <a>Профиль администратора</a>
                        </Link>
                    </li>
                    <li
                        className={classes.adminMenuItem}
                        onClick={logoutHandler}
                    >
                        Выйти
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminNav;