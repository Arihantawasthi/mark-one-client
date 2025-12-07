export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
}

export const BASE_URL = 'http://localhost:8000/api/v1';

export async function postRequest(url, body) {
    const opts = {
        method: 'POST',
        headers: { ...DEFAULT_HEADERS },
        body
    };

    const response = await fetch(url, opts);
    const data = await response.json();
    return data;
}
