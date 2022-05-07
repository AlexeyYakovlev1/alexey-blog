import { NextApiRequest, NextApiResponse } from "next";
import { JwtPayload, verify } from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
    user: string | JwtPayload;
}

const authMiddleware = (fn: any) => async (req: IGetUserAuthInfoRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "OPTIONS") {
        return fn(req, res);
    }

    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = verify(`${token}`, `${process.env.JWT_KEY}`);

        if (!decoded) {
            return res.status(400).json({ success: false, message: "Нет авторизации" });
        }

        req.user = decoded;

        return await fn(req, res);
    } catch (e) {
        res.status(500).json({ success: false, message: "Нет авторизации" });
    }
};

export default authMiddleware;