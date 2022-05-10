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

const AdminProfile = (): JSX.Element => {
    useAdminCheck();

    const { setLoad } = React.useContext(LoadContext);
    const admin: IUser = useSelector((state: IState) => state.user.data);
    const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: "onChange" });

    if (!admin) setLoad(true);

    const srcAvatar = admin.avatar || "/images/admin-avatar.jpg";
    
    const changeHandler = async(data: any) => {
        console.log(data);
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
                                src={srcAvatar}
                                alt={admin.name}
                                width={150}
                                height={150}
                            />
                            <Input
                                type="file"
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