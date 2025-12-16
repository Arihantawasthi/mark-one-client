import { useState, useRef, useEffect } from "react";
import { checkAnalysisStatus, getAnalysis, getProgressStatus } from "../api/apiClient";
import { getMockWebSocketUrl, getWebSocketUrl } from "../api/requests";
import useAnalysisContext from "../context/useAnalysisContext";

export function useAnalysisProgress(analysisId) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isStatusOpen, setIsStatusOpen] = useState(true);

    const { setIssues, setAnalysisResult, setProgress } = useAnalysisContext();

    const socketRef = useRef(null);

    const loadProgress = async id => {
        try {
            const status = await getProgressStatus(id);
            setProgress(status?.data?.process_status || []);
        } catch (err) {
            setError(err.message || "Failed to fetch analysis progress");
            setIsLoading(false);
        }
    }

    const getFinalData = async (id) => {
        try {
            const data = await getAnalysis(id);
            if (data.data.agg_analysis === null) {
                throw new Error("Analysis is incomplete or corrupted");
            }

            setAnalysisResult(data);
            setIssues(data?.data?.issue_analyses || []);
            await loadProgress(id);
        } catch (err) {
            setError(err.message || "Failed to fetch analysis results");
        } finally {
            setIsLoading(false);
            setIsStatusOpen(false);
        }
    }

    const connectWebSocket = (id) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        const wsUrl = getWebSocketUrl(id);
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => console.log("WebSocket connection established");
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setProgress(prev => [...prev, data]);

                if (data.progress >= 100) {
                    ws.close();
                    getFinalData(id);
                }
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        };
        ws.onerror = (err) => {
            console.error("WebSocket error:", err);
            setError("WebSocket connection error");
            ws.close();
            setIsLoading(false);
        };
    };

    const startTracking = async (analysisId) => {
        setIsLoading(true);
        setError(null);

        try {
            const initialStatus = await checkAnalysisStatus(analysisId);

            if (initialStatus.data.status === "completed") {
                await getFinalData(analysisId);
            } else {
                setProgress(prev => [
                    ...prev,
                    {
                        progress: initialStatus.progress || 0,
                        title: initialStatus.title || "Resuming...",
                        detail: initialStatus.detail || "Connecting to stream..."
                    }
                ]);
                connectWebSocket(analysisId);
            }
        } catch (err) {
            setError(err.message || "Failed to start analysis tracking");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        }
    }, []);

    return {
        isLoading,
        error,
        isStatusOpen,
        setIsStatusOpen,
        statusData: useAnalysisContext().progress,
        startTracking
    }
}
