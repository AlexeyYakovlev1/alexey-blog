import { NextApiResponse } from "next";
import db from "../../../db";
import authMiddleware, { IGetUserAuthInfoRequest } from "../middleware/auth.middleware";

const create = authMiddleware(async (req: IGetUserAuthInfoRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === "POST") {
        const { title, description, tags } = body;
        const query = `INSERT INTO post (owner, title, description, tags) VALUES ($1, $2, $3, $4)`;
        const user: any = req.user;
        const newPost = await db.query(query, [user.id, title, description, tags]);

        res.status(201).json({ success: true, message: "Пост опубликован", post: newPost.rows[0] });
    } else {
        res.status(400).json({ success: false, message: "Мы используем только POST запрос" });
    }
});

export default create;