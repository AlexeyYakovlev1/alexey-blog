import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        try {
            const query = `SELECT * FROM post`;
            const allPosts = await db.query(query);

            res.json({ success: true, posts: allPosts.rows });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
};

export default getAll;