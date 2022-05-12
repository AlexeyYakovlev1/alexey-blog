export default async function posts() {
    const response = await fetch(`${process.env.API_URL}/posts`);
    const data = await response.json();

    return { data, response };
}