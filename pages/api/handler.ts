import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).end(`Sorry something happened! ${error.message}`);
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).end(`Method ${req.method} not allowed`);
    }
});

export default handler;