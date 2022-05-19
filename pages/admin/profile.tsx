import MainLayout from "../../components/Layouts/MainLayout";
import classes from "./Admin.module.sass";
import cn from "classnames";
import useAdminCheck from "../../hooks/useAdminCheck";
import { IState } from "../../interfaces/redux.interface";
import { useSelector } from "react-redux";
import Image from "next/image";
import { IUser } from "../../interfaces/user.interface";
import Title from "../../components/UI/Title/Title";
import Input from "../../components/UI/Input/Input";
import LoadContext from "../../context/load.context";
import React from "react";
import Textarea from "../../components/UI/Textarea/Textarea";
import Button from "../../components/UI/Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import AlertContext from "../../context/alert.context";

const AdminProfile = (): JSX.Element => {
    useAdminCheck();

    const { setLoad } = React.useContext(LoadContext);
    const { setInfo, setActive } = React.useContext(AlertContext);

    const admin: IUser = useSelector((state: IState) => state.user.data);
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: "onChange" });
    
    const [avatar, setAvatar] = React.useState<string | null>(null);

    if (!admin) setLoad(true);

    const srcAvatar = admin.avatar ? `/adminAvatars/${admin.avatar}` : "/images/admin-avatar.jpg";
    
    // загрузка аватара
    const uploadAvatar = async(event: any) => {
        if (!event.target?.files.length) return;
        setLoad(true);

        const formData = new FormData();
        formData.append("avatar", event.target.files[0]);
        const { data } = await axios.post(`${process.env.API_URL}/admins/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        if (!data.success) {
            setInfo({ type: "WRONG", message: data.message || "Ошибка при загрузке аватара" });
            setLoad(false);
            return setActive(true);
        }

        setAvatar(data.filename);
        setLoad(false);
    };

    // отправка полной формы данных для изменения
    const changeHandler = async(data: any) => {
        setLoad(true);
        const conf = { ...data, avatar };
        
        const response = await fetch(`${process.env.API_URL}/settings/change`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(conf)
        });
        const serverData = await response.json();
        if (!serverData.success) {
            setInfo({ type: "WRONG", message: data.message || "Ошибка при изменении данных" });
            setLoad(false);
            return setActive(true);
        }

        setInfo({ type: "SUCCESS", message: data.message || "Данные изменены" });
        setActive(true);
        setLoad(false);
    };

    return (
        <MainLayout title={`Администратор ${admin.name}`}>
            <div className={cn(classes.profile, "container")}>
                <div className={classes.profileInfo}>
                    <div className={classes.profileInfoAvatar}>
                        <Image
                            src={srcAvatar}
                            alt={admin.name}
                            width={150}
                            height={150}
                        />
                    </div>
                    <Title tag="h2" className={classes.profileInfoName}>{admin.name}</Title>
                    <small className={classes.profileInfoEmail}>{admin.email}</small>
                    <p className={classes.profileInfoDescription}>{admin.description}</p>
                </div>
                <div className={classes.profileSettings}>
                    <header className={classes.profileSettingsHeader}>
                        <Title tag="h2" className={classes.profileSettingsTitle}>Настройка информации</Title>
                        <p className={classes.profileSettingsDescription}>
                            Чтобы изменить данные об аккаунте, введите их ниже.
                        </p>    
                    </header>
                    <form className={classes.profileSettingsForm} onSubmit={handleSubmit(changeHandler)}>
                        <div className={classes.profileSettingsAvatar}>
                            <Image
                                src={avatar ? `/adminAvatars/${avatar}` : srcAvatar}
                                alt={admin.name}
                                width={150}
                                height={150}
                            />
                            <Input
                                type="file"
                                onChange={uploadAvatar}
                            />
                        </div>
                        <div className={classes.profileSettingsInput}>
                            {errors?.name && <span className={classes.inputWrong}>
                                {errors?.name?.message || "Введите корректное имя"}
                            </span>}
                            <Input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Поле обязательно к заполнению"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Минимальная длина имени 3 символа"
                                    }
                                })}
                                type="text"
                                defaultValue={admin.name}
                                placeholder="Введите ваше имя"
                            />
                        </div>
                        <div className={classes.profileSettingsInput}>
                            {errors?.email && <span className={classes.inputWrong}>
                                {errors?.email?.message || "Введите корректную почту"}
                            </span>}
                            <Input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Поле обязательно к заполнению"
                                    },
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Почта не является корректной"
                                    }
                                })}
                                type="email"
                                defaultValue={admin.email}
                                placeholder="Введите ваш email"
                            />
                        </div>
                        <div className={classes.profileSettingsInput}>
                            {errors?.description && <span className={classes.inputWrong}>
                                {errors?.description?.message || "Введите корректное описание"}
                            </span>}
                            <Textarea
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "Поле обязательно к заполнению"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Минимальная длина описания 10 символов"
                                    }
                                })}
                                defaultValue={admin.description}
                                placeholder="Введите описание профиля"
                            />
                        </div>
                        <Button
                            className={classes.profileSettingsSubmit}
                            type="submit"
                            disabled={!isValid}
                        >
                            Сохранить
                        </Button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default AdminProfile;