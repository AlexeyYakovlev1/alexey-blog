import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import classes from "./Input.module.sass";
import cn from "classnames";

interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement> { }

const Input = ({ className, ...props }: IInputProps): JSX.Element => {
    return (
        <input
            className={cn(classes.input, className)}
            {...props}
        />
    );
};

export default Input;