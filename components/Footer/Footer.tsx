import classes from "./Footer.module.sass";
import cn from "classnames";

const Footer = (): JSX.Element => {
    return (
        <footer className={classes.footer}>
            <div className={cn(classes.content, "container")}>
                <p className={classes.text}>Copyright © 2022–2022 Alexey Yakovlev</p>
            </div>
        </footer>
    );
};

export default Footer;