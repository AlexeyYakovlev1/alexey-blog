import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        const query = `SELECT * FROM tag`;
        const tags = await db.query(query);

        res.json({ success: true, tags: tags.rows });
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
};

export default getAll;