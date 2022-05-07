import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";
import authMiddleware from "../middleware/auth.middleware";

const getAll = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        try {
            const query = `SELECT * FROM admin`;
            const admins = await db.query(query);

            res.status(200).json({ success: true, admins: admins.rows });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
});

export default getAll;