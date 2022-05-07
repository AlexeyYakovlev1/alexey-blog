import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../db";
import adminMiddleware from "../../middleware/admin.middleware";

const deleteHandler = adminMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method === "DELETE") {
        try {
            const data = [query.id];
            const queryForSearch = `SELECT * FROM admin WHERE id = $1`;
            const findAdmin = await db.query(queryForSearch, data);

            if (!findAdmin.rows.length) {
                return res.status(400).json({ success: false, message: "Такого администратора не существует" });
            }

            const queryForDelete = `DELETE FROM admin WHERE id = $1`;

            await db.query(queryForDelete, data);

            res.status(200).json({ success: true, message: "Администратор был удален" });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только DELETE запрос" });
    }
});

export default deleteHandler;