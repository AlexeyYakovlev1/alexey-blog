import handler from "../../handler";
import multer from "multer";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: { bodyParser: false }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/coverImages");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const image = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });
const coverPhoto = image.single("cover");

handler.use(coverPhoto);

export interface IFileRequest extends NextApiRequest {
    file: any;
}

export default handler.post(async (req: IFileRequest, res: NextApiResponse) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ success: false, message: "Файл не найден" });
        }

        res.json({ success: true, filename: file.filename });
    } catch (e: any) {
        res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
    }
});