import React from "react";
import classes from "./Input.module.sass";
import cn from "classnames";

// sorry for any type but this solution must be here
const Input = React.forwardRef(({ className, ...props }: any, ref): JSX.Element => {
    return (
        <input
            ref={ref}
            className={cn(classes.input, className)}
            {...props}
        />
    );
});

// 0_0
Input.displayName = "Input";

export default Input;