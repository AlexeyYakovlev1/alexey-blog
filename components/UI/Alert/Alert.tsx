import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import classes from "./Alert.module.sass";
import cn from "classnames";
import Image from "next/image";
import AlertContext from "../../../context/alert.context";

interface IAlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> { }

const Alert = ({ className, ...props }: IAlertProps): JSX.Element => {
    const { info, setActive } = React.useContext(AlertContext);
    
    return (
        <div
            className={cn(classes.alert, className)}
            {...props}
        >
            <div className={cn(classes.photo, {
                [classes.success]: info.type === "SUCCESS",
                [classes.wrong]: info.type === "WRONG",
                [classes.info]: info.type === "INFO"
            })}>
                <Image
                    src={`/alertTypes/${info.type.toLowerCase()}.svg`}
                    alt="alert type"
                    width={24}
                    height={24}
                />
            </div>
            <div className={classes.content}>
                <span className={classes.title}>
                    {info.type === "SUCCESS" && "Успех"}
                    {info.type === "WRONG" && "Ошибка"}
                    {info.type === "INFO" && "Информация"}
                </span>
                <p className={classes.message}>{info.message}</p>
            </div>
            <div className={classes.close} onClick={() => setActive(false)}>
                <span>&#9587;</span>
            </div>
        </div>
    );
};

export default Alert;