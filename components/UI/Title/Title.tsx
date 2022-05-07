import classes from "./Title.module.sass";
import cn from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

interface ITitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    tag?: "h1" | "h2" | "h3";
    children: React.ReactNode;
}

const Title = ({ tag = "h1", className, children, ...props }: ITitleProps) => { 
    switch(tag) {
        case "h1":
            return (
                <h1
                    className={cn(classes.title, className)}
                    {...props}
                >
                    {children}
                </h1>
            );
        case "h2":
            return (
                <h2
                    className={cn(classes.title, className)}
                    {...props}
                >
                    {children}
                </h2>
            );
        case "h3":
            return (
                <h3
                    className={cn(classes.title, className)}
                    {...props}
                >
                    {children}
                </h3>
            );
        default:
            return <React.Fragment></React.Fragment>;
    }
};

export default Title;