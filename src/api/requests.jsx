import { DEFAULT_HEADERS, BASE_URL } from "./apiClient";

export function createMarketScoutRequest(marketQueries) {
    return {
        url: `${BASE_URL}/get-analysis`,
        method: 'POST',
        headers: { ...DEFAULT_HEADERS },
        body: JSON.stringify({ queries: marketQueries }),
    };
}

export function createGetAnalysisStatusRequest(analysisId) {
    return `${BASE_URL}/analysis-status/${analysisId}`;
}

export function getWebSocketUrl(analysisId) {
    return `ws://localhost:8000/api/v1/status/${analysisId}`;
}

export function createGetAnalysisRequest(analysisId) {
    return `${BASE_URL}/analysis/${analysisId}`;
}
