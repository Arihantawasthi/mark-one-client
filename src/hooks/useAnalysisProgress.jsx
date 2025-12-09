import { useState, useRef, useEffect } from "react";
import { checkAnalysisStatus, getAnalysis } from "../api/apiClient";
import { getMockWebSocketUrl, getWebSocketUrl } from "../api/requests";

export function useAnalysisProgress(analysisId) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [statusData, setStatusData] = useState([{
        progress: 0,
        title: "Initializing...",
        detail: "Preparing to scan...",
        analysisId: analysisId,
    }]);
    const [isStatusOpen, setIsStatusOpen] = useState(true);
    console.log("Status Data:", statusData);

    const socketRef = useRef(null);

    const getFinalData = async (id) => {
        try {
            const data = await getAnalysis(id);
            setAnalysisResult(data);
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

        const wsUrl = getMockWebSocketUrl(id);
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => console.log("WebSocket connection established");
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setStatusData(prev => [
                    ...prev,
                    {
                        progress: data.progress || prev.progress,
                        title: data.title || prev.title,
                        detail: data.detail || prev.detail,
                    }
                ]);

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
        setStatusData(prev => [
            ...prev,
            {
                progress: 0,
                title: "Starting...",
                detail: "Connecting to analysis stream..."
            }
        ]);

        try {
            const initialStatus = await checkAnalysisStatus(analysisId);

            if (initialStatus.data.status === 0) {
                await getFinalData(analysisId);
            } else {
                setStatusData(prev => [
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
        statusData,
        isStatusOpen,
        setIsStatusOpen,
        analysisResult,
        startTracking
    }
}
