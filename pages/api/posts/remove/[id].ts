import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../db";
import authenticatedMiddleware from "../../middleware/auth.middleware";
import { unlink, existsSync } from "fs";
import { resolve } from "path";

const remove = authenticatedMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method === "DELETE") {
        try {
            const queryForFind = `SELECT * FROM post WHERE id = $1`;
            const findPost = await db.query(queryForFind, [query.id]);

            if (!findPost.rows.length) {
                return res.status(400).json({ success: false, message: "Поста по такому идентификатору не существует" });
            }

            let errImage = false;

            const post = findPost.rows[0];

            // удаляем теги
            for (let i = 0; i < post.tags.length; i++) {
                const idTag = post.tags[i];
                const queryForDeleteTag = `DELETE FROM tag WHERE id = $1`;
                await db.query(queryForDeleteTag, [idTag]);
            }

            const imagePath = `${process.env.PROJECT_ROOT}/public/coverImages/${post.cover_image}`;

            // удаляем обложку
            if (existsSync(imagePath)) {
                unlink(resolve(imagePath), (err) => {
                    if (err) {
                        errImage = true;
                        return res.status(400).json({ success: false, message: `Ошибка при удалении обложки: ${err.message}` });
                    }
                });
            }

            if (errImage) return;

            const queryForDelete = `DELETE FROM post WHERE id = $1`;
            await db.query(queryForDelete, [query.id]);

            res.json({ success: true, message: "Пост удален" });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только POST запрос" });
    }
});

export default remove;