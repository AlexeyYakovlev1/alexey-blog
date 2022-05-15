export interface IPost {
    id: number;
    owner: number;
    title: string;
    description: string;
    tags: Array<string>;
    cover_image: string;
    createdAt: Date;
}

export interface ITag {
    id: number;
    value: string;
}