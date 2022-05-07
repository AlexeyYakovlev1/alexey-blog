import classes from "./Post.module.sass";
import type { NextPage } from "next";
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

const Post: NextPage = (): JSX.Element => {
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
        <MainLayout title={`Владилен Минин о своих курсах по веб-разработке и опыте использования WebStorm`}>
            <div className={cn(classes.post, "container")}>
                <header className={classes.header}>
                    <ul className={classes.tags}>
                        <Tag className={classes.tagsItem}>Разработка</Tag>
                        <Tag className={classes.tagsItem}>Умения</Tag>
                    </ul>
                    <Title className={classes.title}>Владилен Минин о своих курсах по веб-разработке и опыте использования WebStorm</Title>
                    <span className={classes.createdAt}>05.05.2022</span>
                </header>
                <div className={classes.body}>
                    <p className={classes.description}>
                        Во-первых, коробочность. Я очень не люблю что-то настраивать. C WebStorm я могу быть уверен в том, что даже если мне придется установить его на новый компьютер, все будет работать сразу, без установки каких-либо расширений. Это очень крутая автоматизация разработки, когда тебе не нужно отвлекаться на что-то лишнее.
                        Мне также нравится, как много фич зашито внутри WebStorm. Зачастую это что-то очень точечное. Например, когда я вставляю HTML-code в jsx-файл в React, WebStorm автоматически меняет class на className. Мелочь, а приятно. Возможно, для VS Code есть расширение, которое может сделать то же самое, но его еще надо найти и установить. И проверить, что оно работает. WebStorm же делает это за тебя, и это классно.
                        Еще по сравнению с VS Code WebStorm — это некая надежность. Например, у меня часто бывает такая ситуация, что надо рефакторить проект. Например, поменять названия папок или файлов. Когда я делаю это в WebStorm, то я практически на 100% уверен, что он это сделает. В VS Code с этим бывают проблемы.
                    </p>
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