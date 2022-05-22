import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../db";

const findPostByTag = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method === "GET") {
        try {
            const currentTag = query.tag;

            const queryForFindAllPosts = `SELECT * FROM post`;
            const queryForFindIdTag = `SELECT id FROM tag WHERE value = $1`;

            const findPosts = await db.query(queryForFindAllPosts);
            const findIdTag = await db.query(queryForFindIdTag, [currentTag]);

            const posts = findPosts.rows;
            const filtPosts = [];

            // находим посты, у которых id тэгов совпадают с findIdTag
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];

                if (post.tags.includes(findIdTag.rows[0].id)) {
                    let newPost = { ...post };
                    const tags = [];

                    // заменяем id тэга из массива на его значение
                    for (let i = 0; i < post.tags.length; i++) {
                        const tag = post.tags[i];
                        const queryForReplaceIdTagsToValue = `SELECT value FROM tag WHERE id = $1`;
                        const dbTag = await db.query(queryForReplaceIdTagsToValue, [tag]);

                        tags.push(dbTag.rows[0].value);
                    }

                    newPost = { ...post, tags: tags };
                    filtPosts.push(newPost);
                }
            }

            res.json({ success: true, posts: filtPosts });
        } catch (e: any) {
            res.status(500).json({ success: false, message: `Ошибка сервера: ${e.message}` });
        }
    } else {
        res.status(400).json({ success: false, message: "Мы используем только GET запрос" });
    }
};

export default findPostByTag;