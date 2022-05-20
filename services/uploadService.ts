import multer from "multer";
import path from "path";

function upload(namePhoto: string, type: "single" | "array", direc: string) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, direc);
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
    });
    const image = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

    let photo = null;

    switch (type) {
        case "single":
            photo = image.single(namePhoto);
            break;
        case "array":
            photo = image.array(namePhoto);
            break;
        default:
            return;
    }

    return photo;
}

export default upload;