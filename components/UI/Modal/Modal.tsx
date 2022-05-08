import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import classes from "./Modal.module.sass";
import cn from "classnames";

interface IModalProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    children: React.ReactNode;
    setActive: (value: boolean | ((active: boolean) => boolean)) => void;
}

const Modal = ({ className, children, setActive, ...props }: IModalProps): JSX.Element => {
    return (
        <div
            className={cn(classes.modal, className)}
            {...props}
            onClick={() => setActive(false)}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={classes.content}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;