import Image from "next/image";
import Link from "next/link";
import { IPost } from "../../../interfaces/post.interface";
import Button from "../../UI/Button/Button";
import Tag from "../../UI/Tag/Tag";
import classes from "./Post.module.sass";

const Post = (props:IPost): JSX.Element => {
    return (
        <li className={classes.post}>
            <article className={classes.content}>
                <header className={classes.header}>
                    <span className={classes.createdAt}>05.05.2022</span>
                    <h2 className={classes.title}>
                        <Link href={`/posts/${props.id}`}>
                            <a>{props.title}</a>
                        </Link>
                    </h2>
                    <ul className={classes.tags}>
                        {props.tags.map((tag:string) => (
                            <Tag key={tag} className={classes.tagsItem}>{tag}</Tag>
                        ))}
                    </ul>
                </header>
                <div className={classes.coverPhoto}>
                    <Image
                        src={"/images/coverPhoto.png"}
                        alt="cover photo"
                        layout="responsive"
                        width="100%"
                        height="40px"
                        objectFit="contain"
                    />
                </div>
                <div className={classes.content}>
                    <div dangerouslySetInnerHTML={{__html: props.description}} className={classes.description} />
                </div>
                <Button>
                    <Link href={`/posts/${props.id}`}>
                        <a>Читать полностью</a>
                    </Link>
                </Button>
            </article>
        </li>
    );
};

export default Post;