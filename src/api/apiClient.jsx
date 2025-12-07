import { createGetAnalysisRequest, createGetAnalysisStatusRequest } from "./requests";

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
}

export const BASE_URL = 'http://localhost:8000/api/v1';

export async function postRequest(url, body) {
    const opts = {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body
    };

    const response = await fetch(url, opts);
    const data = await response.json();
    return data;
}

export async function getRequest(url) {
    const opts = {
        method: "GET",
        headers: DEFAULT_HEADERS,
    };

    const response = await fetch(url, opts);
    const data = await response.json();
    return data;
}

export async function checkAnalysisStatus(analysisId) {
    const opts = {
        method: "GET",
        headers: DEFAULT_HEADERS,
    }

    const url = createGetAnalysisStatusRequest(analysisId);
    const response = await fetch(url, opts);
    if (!response.ok) {
        throw new Error('Failed to fetch analysis status');
    }
    const data = await response.json();
    return data;
}

export async function getAnalysis(analysisId) {
    const opts = {
        method: "GET",
        headers: DEFAULT_HEADERS,
    }

    const url = createGetAnalysisRequest(analysisId);
    const response = await fetch(url, opts);
    if (!response.ok) {
        throw new Error('Failed to fetch analysis data');
    }
    const data = await response.json();
    return data;
}
