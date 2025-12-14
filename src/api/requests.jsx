import { DEFAULT_HEADERS, BASE_URL, WS_BASE_URL } from "./apiClient";

export function createMarketScoutRequest(marketQueries) {
    return {
        url: `${BASE_URL}/start-query-analysis`,
        method: 'POST',
        headers: { ...DEFAULT_HEADERS },
        body: JSON.stringify({ queries: marketQueries }),
    };
}

export function createNewsletterAnalysisRequest(links) {
    return {
        url: `${BASE_URL}/start-links-analysis`,
        method: 'POST',
        headers: { ...DEFAULT_HEADERS },
        body: JSON.stringify({ links: links }),
    }
}

export function createGetAnalysisStatusRequest(analysisId) {
    return `${BASE_URL}/analysis-status/${analysisId}`;
}

export function getWebSocketUrl(analysisId) {
    return `${WS_BASE_URL}/status/${analysisId}`;
}

export function getMockWebSocketUrl(analysisId=1) {
    return `ws://localhost:8000/api/v1/ws/test-status`;
}

export function createGetAnalysisRequest(analysisId) {
    return `${BASE_URL}/analysis/${analysisId}`;
}

export function createGetProcessStatusRequest(analysisId) {
    return `${BASE_URL}/analysis/process-status/${analysisId}`;
}
