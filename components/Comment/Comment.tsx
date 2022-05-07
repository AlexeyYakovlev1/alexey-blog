import { DetailedHTMLProps, HTMLAttributes } from "react";
import classes from "./Comment.module.sass";
import cn from "classnames";
import { IComment } from "../../interfaces/comment.interface";
import Image from "next/image";

interface ICommentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    info: IComment;
}

const Comment = ({ className, info, ...props }: ICommentProps): JSX.Element => {
    return (
        <article
            className={cn(classes.comment, className)}
            {...props}
        >
            <header className={classes.header}>
                <Image
                    src={`/images/avatar.png`}
                    alt="user photo"
                    width={24}
                    height={24}
                />
                <span className={classes.name}>Alexey Smirnov</span>
                <span className={classes.createdAt}>05.05.2022</span>
            </header>
            <p className={classes.text}>{info.text}</p>
        </article>
    );
};

export default Comment;