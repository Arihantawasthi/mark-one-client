import { DEFAULT_HEADERS, BASE_URL } from "./apiClient";

export function createMarketScoutRequest(marketQueries) {
    return {
        url: `${BASE_URL}/get-analysis`,
        method: 'POST',
        headers: { ...DEFAULT_HEADERS },
        body: JSON.stringify({ queries: marketQueries }),
    };
}
