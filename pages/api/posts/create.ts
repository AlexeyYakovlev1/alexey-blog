import { NextApiResponse } from "next";
import db from "../../../db";
import authMiddleware, { IGetUserAuthInfoRequest } from "../middleware/auth.middleware";

const create = authMiddleware(async (req: IGetUserAuthInfoRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === "POST") {
        const { title, description, tags } = body;

        const idTags: Array<number> = [];

        for (let i = 0; i < tags.length; i++) {
            const findTag = await db.query(`SELECT * FROM tag WHERE value = $1`, [tags[i]]);

            if (!findTag.rows.length) {
                const newTag = await db.query(`INSERT INTO tag (value) VALUES($1) RETURNING *`, [tags[i]]);
                idTags.push(newTag.rows[0].id);
            } else {
                idTags.push(findTag.rows[0].id);
            }
        }

        const query = `INSERT INTO post (owner, title, description, tags) VALUES ($1, $2, $3, $4) RETURNING *`;
        const user: any = req.user;
        const newPost = await db.query(query, [user.id, title, description, idTags]);

        res.status(201).json({ success: true, message: "Пост опубликован", post: newPost.rows[0] });
    } else {
        res.status(400).json({ success: false, message: "Мы используем только POST запрос" });
    }
});

export default create;