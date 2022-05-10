import db from "../../../db";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === "POST") {
        try {
            const { email, password } = body;
            const query = `SELECT * FROM person WHERE email = $1`;
            const findAdmin = await db.query(query, [email]);

            if (!findAdmin.rows.length) {
                return res.status(400).json({ success: false, message: "Администратор не найден" });
            }

            const admin = findAdmin.rows[0];
            const comparePassword = await compare(password, admin.password);

            if (!comparePassword) {
                return res.status(400).json({ success: false, message: "Данные неверны" });
            }

            const payload = { id: admin.id, email: admin.email };
            const token = sign(payload, `${process.env.JWT_KEY}`, { expiresIn: "24h" });

            res.status(200).json({ success: true, user: { ...admin }, token });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только POST запрос" });
    }
};

export default login;