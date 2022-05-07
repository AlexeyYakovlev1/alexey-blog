import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

const getOne = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method === "GET") {
        try {
            const queryForSearch = `SELECT * FROM admin WHERE id = $1`;
            const findAdmin = await db.query(queryForSearch, [query.id]);

            if (!findAdmin.rows.length) {
                return res.status(400).json({ success: false, message: "Администратор не найден" });
            }

            res.status(200).json({ success: true, admin: findAdmin.rows[0] });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
};

export default getOne;