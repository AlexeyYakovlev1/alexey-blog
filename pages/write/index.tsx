import type { NextPage } from "next";
import MainLayout from "../../components/Layouts/MainLayout";
import classes from "./Write.module.sass";
import cn from "classnames";
import Title from "../../components/UI/Title/Title";
import Button from "../../components/UI/Button/Button";
import React from "react";
import useAdminCheck from "../../hooks/useAdminCheck";
import { Editor } from '@tinymce/tinymce-react';
import Cookies from "js-cookie";
import AlertContext from "../../context/alert.context";
import Input from "../../components/UI/Input/Input";

const Write: NextPage = () => {
    useAdminCheck();

    const editorRef: any = React.useRef(null);
    const [content, setContent] = React.useState({ title: "", description: "", tags: [""] });
    const { setInfo, setActive } = React.useContext(AlertContext);

    const submitHandler = async (event: any) => {
        event.preventDefault();

        const response = await fetch(`${process.env.API_URL}/posts/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...content, tags: content.tags.join("").trim().split(",")})
        });
        const data = await response.json();

        if (!response.ok) {
            setInfo({ type: "WRONG", message: data.message || "Ошибка при публикации поста" });
            return setActive(true);
        }
        
        setInfo({ type: "SUCCESS", message: data.message || "Пост опубликован" });
        setActive(true);
    };

    return (
        <MainLayout title="Написать пост">
            <div className={cn(classes.write, "container")}>
                <header className={classes.header}>
                    <Title tag="h2" className={classes.title}>Новая запись</Title>
                    <p className={classes.description}>Ниже опишите ваш пост</p>
                </header>
                <form onSubmit={submitHandler} className={classes.form}>
                    <Input
                        type="text"
                        placeholder="Введите заголовок"
                        value={content.title}
                        onChange={(event: any) => setContent({ ...content, title: event.target.value })}
                    />
                    <Input
                        type="text"
                        placeholder="Введите тэги через запятую"
                        value={content.tags.join(",")}
                        onChange={(event: any) => setContent({ ...content, tags: event.target.value.split(",") })}
                    />
                    <Editor
                        // tinymceScriptSrc={process.env.PROJECT_ROOT + "/plugin/tinymce/tinymce.min.js"}
                        id="editor"
                        apiKey="1wvrg5fziw3vh6v1hkk8xss6rsa7jahmc5kxlytrfo39bq6e"
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }'
                        }}
                        onEditorChange={text => setContent({ ...content, description: text })}
                    />
                    <Button type="submit">Опубликовать</Button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Write;