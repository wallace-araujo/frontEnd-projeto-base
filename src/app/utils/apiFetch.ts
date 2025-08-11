
export async function apiFetch(path: string, options?: RequestInit) {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';
    const url = `${BASE_URL}${path}`;

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return response.json();
}