import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        try {
            const query = `SELECT * FROM post`;
            const allPosts = await db.query(query);

            // find tags by id and replace they on value
            for (let i = 0; i < allPosts.rows.length; i++) {
                for (let j = 0; j < allPosts.rows[i].tags.length; j++) {
                    const idTag = allPosts.rows[i].tags[j];

                    const queryForSearch = `SELECT * FROM tag WHERE id = $1`;
                    const findTag = await db.query(queryForSearch, [idTag]);

                    allPosts.rows[i].tags[j] = findTag.rows[0].value;
                }
            }

            res.json({ success: true, posts: allPosts.rows });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
};

export default getAll;