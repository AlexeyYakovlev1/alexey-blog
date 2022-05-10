export interface IUser {
    id: number;
    avatar: string;
    name: string;
    email: string;
    description: string;
    password?: string;
}