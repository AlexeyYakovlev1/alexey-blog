import Image from "next/image";
import classes from "./Welcome.module.sass";
import cn from "classnames";
import Title from "../UI/Title/Title";

const Welcome = (): JSX.Element => {
    return (
        <div className={classes.welcome}>
            <div className={cn(classes.body, "container")}>
                <div className={classes.avatar}>
                    <Image src="/images/alexey.jpg" alt="Alexey Yakovlev" width={96} height={96} />
                </div>
                <div className={classes.about}>
                    <Title tag="h2">Алексей Яковлев</Title>
                    <p className={classes.description}>Junior Front-end Developer</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;