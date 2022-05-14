import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../db";
import { IPost } from "../../../../interfaces/post.interface";

const findPostByTitle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method === "GET") {
        const queryForFindAllPosts = `SELECT * FROM post`;
        const allPosts = await db.query(queryForFindAllPosts);

        const findPost = allPosts.rows.filter((post: IPost) => {
            return post.title.toLowerCase().includes(query.title.toString().trim().toLowerCase());
        });

        if (!findPost.length) {
            return res.status(400).json({ success: false, message: "Ничего не найдено" });
        }

        res.json({ success: true, post: findPost[0] });
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
};

export default findPostByTitle;