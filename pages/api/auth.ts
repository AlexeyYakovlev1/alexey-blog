import { NextApiResponse } from "next";
import db from "../../db";
import authMiddleware, { IGetUserAuthInfoRequest } from "./middleware/auth.middleware";
import { sign } from "jsonwebtoken";

const auth = authMiddleware(async (req: IGetUserAuthInfoRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        try {
            const user: any = req.user;
            const payload = { id: user.id, email: user.email };
            const query = `SELECT * FROM person WHERE id = $1`;
            const findUser = await db.query(query, [user.id]);
            const token = sign(payload, `${process.env.JWT_KEY}`, { expiresIn: "24h" });

            res.json({ success: true, token, user: { ...findUser.rows[0] } });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
});

export default auth;