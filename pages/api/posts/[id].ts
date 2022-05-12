import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

const getOne = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method === "GET") {
        try {
            const queryForFind = `SELECT * FROM post WHERE id = $1`;
            const findPost = await db.query(queryForFind, [query.id]);
            const post = findPost.rows[0];

            if (!post) {
                return res.status(400).json({ success: false, message: "Пост не найден" });
            }

            const tags = [];

            for (let i = 0; i < post.tags.length; i++) {
                const queryForFindTag = `SELECT * FROM tag WHERE id = $1`;
                const findTag = await db.query(queryForFindTag, [post.tags[i]]);
                tags.push(findTag.rows[0].value);
            }

            const updatePost = { ...post, tags };

            res.json({ success: true, post: updatePost });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
};

export default getOne;