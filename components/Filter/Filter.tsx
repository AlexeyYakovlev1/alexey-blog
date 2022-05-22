import React from "react";
import { useSelector } from "react-redux";
import LoadContext from "../../context/load.context";
import { ITag } from "../../interfaces/post.interface";
import { IState } from "../../interfaces/redux.interface";
import { IDataPosts } from "../../pages/admin/panel";
import classes from "./Filter.module.sass";

interface IFilterProps {
    setPosts: React.Dispatch<React.SetStateAction<IDataPosts>>;
}

const Filter = ({ setPosts }: IFilterProps): JSX.Element => {
    const tags: Array<ITag> = useSelector((state: IState) => state.tags.list);
    const { setLoad } = React.useContext(LoadContext);

    React.useEffect(() => {
        if (!tags[0].value) setLoad(true);

        // eslint-disable-next-line
    }, [tags[0].value]);

    const filterHandler = async(event: any) => {
        setLoad(true);
        
        const currentTag = `${event.target.value}`;
        const response = await fetch(`${process.env.API_URL}/posts/find/tag/${currentTag}`);
        const data = await response.json();

        if (data.success) {
            setPosts({ posts: data.posts, clear: false });
        }
        
        setLoad(false);
    };

    return (
        <div className={classes.filter}>
            <div className={classes.tag}>
                <select
                    onChange={filterHandler}
                    className={classes.select}
                    name="category"
                >
                    {tags[0].value ? tags.map((tag: ITag) => (
                        <option key={tag.id} value={tag.value.toLowerCase()}>
                            {tag.value.replace(tag.value[0], tag.value[0].toUpperCase())}
                        </option>
                    )) : <option value="Фильтр">Фильтр</option>}
                </select>
            </div>
        </div>
    );
};

export default Filter;