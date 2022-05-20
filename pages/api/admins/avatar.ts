import { NextApiResponse } from "next";
import handler from "../handler";
import authenticatedMiddleware from "../middleware/auth.middleware";
import { IFileRequest } from "../posts/files/cover";
import uploadService from "../../../services/uploadService";

export const config = {
    api: { bodyParser: false }
};

const avatar: any = uploadService("avatar", "single", "public/adminAvatars");

handler.use(avatar);

export default authenticatedMiddleware(handler.post(async (req: IFileRequest, res: NextApiResponse) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ success: false, message: "Файл не найден" });
        }

        res.json({ success: true, filename: file.filename });
    } catch (e: any) {
        res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
    }
}));