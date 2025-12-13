import { createContext, useState } from 'react';
import { getAnalysesList, getAnalysis, startManualIssueAnalysis } from '../api/apiClient';
import useAppContext from './useAppContext';
import { getWebSocketUrl } from '../api/requests';

const AnalysisContext = createContext(null);

function AnalysisProvider({ children }) {
    const [issues, setIssues] = useState([]);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [progress, setProgress] = useState([]);
    const [manualIssueProgress, setManualIssueProgress] = useState({});
    const [selectedIssue, setSelectedIssue] = useState(null);

    const [manualLoading, setManualLoading] = useState(false);
    const [manualError, setManualError] = useState(null);
    const manualSocketRef = useState(null);
    const { showBanner } = useAppContext();

    async function refreshIssues(analysisId) {
        try {
            const res = await getAnalysis(analysisId);
            if (res.requestStatus !== 1) {
                throw new Error(res.message || "Failed to refresh issues");
            }
            setIssues(res?.data?.issue_analyses || []);
        } catch (err) {
            showBanner({
                title: "Error",
                description: err.message,
                type: "error"
            });
        }
    }

    function connectManualIssuesWebSocket(analysisId) {
        if (manualSocketRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        const ws = new WebSocket(getWebSocketUrl(analysisId));
        manualSocketRef.current = ws;
        setManualIssueProgress({
            'title': 'Connecting...' ,
            'detail': 'Establishing connection to fetch manual issues',
            'progress': 0
        });

        ws.open = () => console.log("Manual Issues WebSocket connection established");
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setManualIssueProgress(data);

                if (data.progress >= 100) {
                    ws.close();
                    refreshIssues(analysisId);
                    showBanner({
                        title: "Manual Issues Analyzed!",
                        description: "All manual issues have been successfully fetched.",
                        type: "success"
                    });
                }
            } catch (err) {
                console.error("Error parsing Manual Issues WebSocket message:", err);
            }
        };
        ws.onerror = (err) => {
            console.error("Manual Issues WebSocket error:", err);
            showBanner({
                title: "Error",
                description: "WebSocket connection error while fetching manual issues.",
                type: "error"
            });
            ws.close();
        };
        ws.onclose = () => {
            setManualIssueProgress([]);
        };
    }

    async function addManualIssues(analysisId, issue_urls) {
        try {
            setManualLoading(true);
            setManualError(null);
            setManualIssueProgress({
                'title': 'Starting...' ,
                'detail': 'Initiating manual issues fetch',
                'progress': 0
            });

            const res = await startManualIssueAnalysis(analysisId, issue_urls);
            if (res.requestStatus !== 1) {
                throw new Error(res.message || "Failed to fetch manual issues");
            }

            connectManualIssuesWebSocket(analysisId);
            return true;
        } catch (err) {
            setManualError(err.message || "Failed to fetch manual issues");
            showBanner({
                title: "Error",
                description: err.message,
                type: "error"
            });
            return false;
        } finally {
            setManualLoading(false);
        }
    }

    return (
        <AnalysisContext.Provider value={{
            issues,
            setIssues,
            selectedIssue,
            setSelectedIssue,
            analysisResult,
            setAnalysisResult,
            progress,
            setProgress,

            manualLoading,
            manualError,
            addManualIssues,
            manualIssueProgress,
        }}>
            {children}
        </AnalysisContext.Provider>
    );
}

export { AnalysisContext, AnalysisProvider };
