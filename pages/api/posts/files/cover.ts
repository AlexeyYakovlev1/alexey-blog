import handler from "../../handler";
import { NextApiRequest, NextApiResponse } from "next";
import authenticatedMiddleware from "../../middleware/auth.middleware";
import uploadService from "../../../../services/uploadService";

export const config = {
    api: { bodyParser: false }
};

const coverPhoto: any = uploadService("cover", "single", "public/coverImages");

handler.use(coverPhoto);

export interface IFileRequest extends NextApiRequest {
    file: any;
}

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