import Cookies from "js-cookie";

const auth = async () => {
    const response = await fetch(`${process.env.API_URL}/auth`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    });
    const data = await response.json();

    return { response, data };
};

export default auth;