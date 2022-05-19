export interface IPost {
    id: number;
    owner: number;
    title: string;
    description: string;
    tags: Array<string>;
    cover_image: string;
    created_at: Date;
}

export interface ITag {
    id: number;
    value: string;
}