import React from "react";
import { useSelector } from "react-redux";
import { ITag } from "../../interfaces/post.interface";
import { IState } from "../../interfaces/redux.interface";
import classes from "./Filter.module.sass";

const Filter = (): JSX.Element => {
    const tags: Array<ITag> = useSelector((state: IState) => state.tags.list);

    return (
        <div className={classes.filter}>
            <div className={classes.tag}>
                <select className={classes.select} name="category">
                    {tags.map((tag: ITag) => (
                        <option key={tag.id} value={tag.value.toLowerCase()}>
                            {tag.value.replace(tag.value[0], tag.value[0].toUpperCase())}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filter;