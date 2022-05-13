export default async function tags() {
    const response = await fetch(`${process.env.API_URL}/tags`, {
        method: "GET"
    });
    const data = await response.json();

    return { data, response };
}