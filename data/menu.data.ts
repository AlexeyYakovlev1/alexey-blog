import Telegram from "../public/images/connects/telegram.svg";
import Gmail from "../public/images/connects/gmail.svg";
import Vk from "../public/images/connects/vk.svg";
import Github from "../public/images/connects/github.svg";
import { IConnectsMenu, IMenu } from "../interfaces/menu.interface";

export const connectsMenu: Array<IConnectsMenu> = [
    {
        img: Github,
        link: "https://github.com/AlexeyYakovlev1"
    },
    {
        img: Telegram,
        link: "https://t.me/quod_42"
    },
    {
        img: Gmail,
        link: "mailto:alexeyykovlev555@gmail.com"
    },
    {
        img: Vk,
        link: "https://vk.com/quod_42"
    }
];

export const menuItems: Array<IMenu> = [
    {
        name: "Публикации",
        link: "/"
    },
    {
        name: "Обо мне",
        link: "/about"
    }
];