import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../db";
import authenticatedMiddleware from "../../middleware/auth.middleware";

const remove = authenticatedMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method === "DELETE") {
        try {
            const queryForFind = `SELECT * FROM post WHERE id = $1`;
            const findPost = await db.query(queryForFind, [query.id]);

            if (!findPost.rows.length) {
                return res.status(400).json({ success: false, message: "Поста по такому идентификатору не существует" });
            }

            // удаляем теги поста
            for (let i = 0; i < findPost.rows[0].tags.length; i++) {
                const idTag = findPost.rows[0].tags[i];
                const queryForDeleteTag = `DELETE FROM tag WHERE id = $1`;
                await db.query(queryForDeleteTag, [idTag]);
            }

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