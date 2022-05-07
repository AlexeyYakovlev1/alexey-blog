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
                        <Tag className={classes.tagsItem}>Разработка</Tag>
                        <Tag className={classes.tagsItem}>Умения</Tag>
                    </ul>
                </header>
                <div className={classes.coverPhoto}>
                    <Image
                        src={"/images/coverPhoto.png"}
                        alt="cover photo"
                        width={500}
                        height={200}
                    />
                </div>
                <div className={classes.content}>
                    <p className={classes.description}>{props.description}</p>
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