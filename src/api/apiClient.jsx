import { createGetAnalysisRequest, createGetAnalysisStatusRequest, createGetProcessStatusRequest } from "./requests";

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('access_token') || ''}`,
}

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

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

export async function getProgressStatus(analysisId) {
    const opts = {
        method: "GET",
        headers: DEFAULT_HEADERS,
    }

    const url = createGetProcessStatusRequest(analysisId);
    const response = await fetch(url, opts);
    if (!response.ok) {
        throw new Error('Failed to fetch process status');
    }
    const data = await response.json();
    return data;
}

export async function getAnalysesList() {
    const opts = {
        method: "GET",
        headers: DEFAULT_HEADERS,
    }

    const url = `${BASE_URL}/analyses/list`;
    const response = await fetch(url, opts);
    if (!response.ok) {
        throw new Error('Failed to fetch analyses list');
    }
    const data = await response.json();
    return data;
}

export async function startManualIssueAnalysis(analysis_id, issue_urls) {
    const opts = {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({ analysis_id, issue_urls }),
    }

    const url = `${BASE_URL}/start-manual-issues-analysis`;
    const response = await fetch(url, opts);
    if (!response.ok) {
        throw new Error('Failed to start manual issues analysis');
    }
    const data = await response.json();
    return data;
}


export async function loginRequest(username, password) {
    const opts = {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({ username, password }),
    }

    const url = `${BASE_URL}/login`;
    const response = await fetch(url, opts);
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    const data = await response.json();
    return data;
}
