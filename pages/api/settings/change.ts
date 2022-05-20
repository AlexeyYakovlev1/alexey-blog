import db from "../../../db";
import { NextApiResponse } from "next";
import authenticatedMiddleware, { IGetUserAuthInfoRequest } from "../middleware/auth.middleware";
import { existsSync, unlink } from "fs";

const changeInfo = authenticatedMiddleware(async (req: IGetUserAuthInfoRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === "PUT") {
        try {
            const currentUser: any = req.user;
            const { avatar, name, email, description } = body;

            const queryForAvatar = `SELECT avatar FROM person WHERE id = $1`;
            const oldAvatar = await db.query(queryForAvatar, [currentUser.id]);
            const oldAvatarPath = `public/adminAvatars/${oldAvatar.rows[0].avatar}`;

            const query = `UPDATE person SET avatar = $1, name = $2, email = $3, description = $4 WHERE id = $5`;
            await db.query(query, [avatar, name, email, description, currentUser.id]);

            // удаляем старый аватар, если такой имеется
            if (existsSync(oldAvatarPath)) {
                unlink(oldAvatarPath, (err: any) => {
                    if (err) {
                        return res.status(400).json({ success: false, message: `Ошибка при удалении старого аватара: ${err.message}` });
                    }
                });
            }

            res.json({ success: true, message: "Данные обновлены" });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только PUT запрос" });
    }
});

export default changeInfo;