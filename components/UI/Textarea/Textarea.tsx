import { DetailedHTMLProps, HTMLAttributes } from "react";
import classes from "./Textarea.module.sass";
import cn from "classnames";

interface ITextareaProps extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>,HTMLTextAreaElement> {}

const Textarea = ({ className, ...props }:ITextareaProps) => {
    return (
        <textarea
            className={cn(classes.textarea, className)}
            {...props}
        />
    );
};

export default Textarea;