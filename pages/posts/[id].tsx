import classes from "./Post.module.sass";
import MainLayout from "../../components/Layouts/MainLayout";
import Tag from "../../components/UI/Tag/Tag";
import cn from "classnames";
import Title from "../../components/UI/Title/Title";
import { IComment } from "../../interfaces/comment.interface";
import Comment from "../../components/Comment/Comment";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Textarea from "../../components/UI/Textarea/Textarea";
import Image from "next/image";
import { Context } from "vm";
import { IPost } from "../../interfaces/post.interface";

interface IPostProps {
    post: IPost;
}

const Post = ({ post }: IPostProps): JSX.Element => {
    const comments: Array<IComment> = [
        {
            id: 3,
            owner: 1,
            text: "Пользуюсь продукцией JetBrains около двух лет. Начал знакомство с IDE CLion, т.к. была необходимость писать на C/C++. Выбрал эту IDE как альтернативу Microsoft Visual Studio, которая мне показалась громоздкой и, на то время, сложной в изучении. Сейчас же пользуюсь в дополнение WebStorm и PhpStorm по образовательной лицензии. И очень благодарен JetBrains за такую возможность.",
            createdAt: new Date()
        },
        {
            id: 2,
            owner: 1,
            text: "Пользуюсь продукцией JetBrains около двух лет. Начал знакомство с IDE CLion, т.к. была необходимость писать на C/C++. Выбрал эту IDE как альтернативу Microsoft Visual Studio, которая мне показалась громоздкой и, на то время, сложной в изучении. Сейчас же пользуюсь в дополнение WebStorm и PhpStorm по образовательной лицензии. И очень благодарен JetBrains за такую возможность.",
            createdAt: new Date()
        }
    ];
    
    return (
        <MainLayout title={post.title}>
            <div className={cn(classes.post, "container")}>
                <header className={classes.header}>
                    <ul className={classes.tags}>
                        {post.tags.map((tag:string) => (
                            <Tag key={tag} className={classes.tagsItem}>{tag}</Tag>
                        ))}
                    </ul>
                    <Title className={classes.title}>{post.title}</Title>
                    <span className={classes.createdAt}>05.05.2022</span>
                </header>
                <div className={classes.coverPhoto}>
                    <Image
                        src="/images/coverPhoto.png"
                        alt="cover photo"
                        layout="responsive"
                        width="100%"
                        height="35px"
                    />
                </div>
                <div className={classes.body}>
                    <div dangerouslySetInnerHTML={{__html: post.description}} className={classes.description} />
                </div>
                <div className={classes.comments}>
                    <Title tag="h2" className={classes.commentsTitle}>Комментарии</Title>
                    <form className={classes.commentsForm}>
                        <Input type="text" placeholder="Имя пользователя" />
                        <div className={classes.commentsFormAvatar}>
                            <Image src="/images/admin-avatar.jpg" alt="user photo" width={24} height={24} />
                            <Input type="file" placeholder="Аватар" />
                        </div>
                        <Textarea
                            placeholder="Оставьте здесь свой комментарий"
                            className={classes.commentsTextarea}
                        />
                        <Button disabled>Написать</Button>
                    </form>
                    {comments.length ? <ul>
                        {comments.map((comment: IComment) => (
                            <Comment className={classes.comment} key={comment.id} info={comment} />
                        ))}
                    </ul> : <span className={classes.commentsText}>Еще никто не прокомментировал этот пост</span>}
                </div>
            </div>
        </MainLayout>
    );
};

export default Post;

export async function getServerSideProps(ctx: Context) {
    const response = await fetch(`${process.env.API_URL}/posts/${ctx.params.id}`, {
        method: "GET"
    });
    const data = await response.json();

    return {
        props: { post: data.post }
    };
}