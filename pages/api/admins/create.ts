import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";
import { hash } from "bcrypt";
import authMiddleware from "../middleware/auth.middleware";

const create = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === "POST") {
        try {
            const { name, email, password } = body;

            const queryForSearch = `SELECT * FROM person WHERE email = $1`;
            const findAdmin = await db.query(queryForSearch, [email]);

            if (findAdmin.rows.length) {
                return res.status(400).json({ success: false, message: "Администратор уже существует" });
            }

            hash(password, 8, async (err, result) => {
                if (err) {
                    return res.status(400).json({ success: false, message: `Ошибка при хешировании: ${err.message}` });
                }

                const queryForCreate = `INSERT INTO person(name, email, password) VALUES($1, $2, $3) RETURNING *`;
                const newAdmin = await db.query(queryForCreate, [name, email, result]);
                const admin = newAdmin.rows[0];

                return res.status(201).json({ success: true, message: "Администратор добавлен", admin });
            });
        } catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только POST запрос" });
    }
});

export default create;