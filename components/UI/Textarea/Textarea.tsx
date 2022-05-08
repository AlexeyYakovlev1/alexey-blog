import React from "react";
import classes from "./Textarea.module.sass";
import cn from "classnames";

const Textarea = React.forwardRef(({ className, ...props }: any, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(classes.textarea, className)}
            {...props}
        />
    );
});

Textarea.displayName = "Textarea";

export default Textarea;