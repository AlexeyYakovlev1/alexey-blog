import classes from "./Filter.module.sass";

const Filter = (): JSX.Element => {
    return (
        <div className={classes.filter}>
            <div className={classes.tag}>
                <select className={classes.select} name="category">
                    <option value="разработка">Разработка</option>
                    <option value="технологии">Технологии</option>
                    <option value="проекты">Проекты</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;