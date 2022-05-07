import { DetailedHTMLProps, LiHTMLAttributes } from "react";
import classes from "./Tag.module.sass";
import cn from "classnames";

interface ITagProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    children: React.ReactNode;
}

const Tag = ({ children, className, ...props }: ITagProps): JSX.Element => {
    return (
        <li
            className={cn(classes.tag, className)}
            {...props}
        >
            {children}
        </li>
    );
};

export default Tag;