import TelegramIcon from "../public/images/connects/telegram.svg";
import GmailIcon from "../public/images/connects/gmail.svg";
import VkIcon from "../public/images/connects/vk.svg";
import GithubIcon from "../public/images/connects/github.svg";
import { IConnectsMenu, IMenu } from "../interfaces/menu.interface";

const connectsMenu: Array<IConnectsMenu> = [
    {
        img: GithubIcon,
        link: "https://github.com/AlexeyYakovlev1"
    },
    {
        img: TelegramIcon,
        link: "https://t.me/quod_42"
    },
    {
        img: GmailIcon,
        link: "mailto:alexeyykovlev555@gmail.com"
    },
    {
        img: VkIcon,
        link: "https://vk.com/quod_42"
    }
];

const menuItems: Array<IMenu> = [
    {
        name: "Публикации",
        link: "/"
    },
    {
        name: "Обо мне",
        link: "/about"
    }
];

export {
    menuItems, connectsMenu
};