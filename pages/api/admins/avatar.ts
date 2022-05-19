import multer from "multer";
import { NextApiResponse } from "next";
import path from "path";
import handler from "../handler";
import authenticatedMiddleware from "../middleware/auth.middleware";
import { IFileRequest } from "../posts/files/cover";

export const config = {
    api: { bodyParser: false }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/adminAvatars");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const image = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });
const avatar = image.single("avatar");

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