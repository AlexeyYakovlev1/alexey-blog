import { IPost } from "../interfaces/post.interface";

const postsData: IPost = {
    id: -1,
    owner: -1,
    created_at: new Date(),
    title: "",
    cover_image: "/images/no-cover-photo.jpg",
    description: "",
    tags: []
};

export default postsData;