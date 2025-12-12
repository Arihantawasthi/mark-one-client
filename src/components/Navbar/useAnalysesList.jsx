import { useState, useEffect } from "react";
import { getAnalysesList } from "../../api/apiClient";

export function useAnalysesList() {
    const [analyses, setAnalyses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchAnalyses() {
        setIsLoading(true);
        setError(null);

        try {
            const res = await getAnalysesList();
            setAnalyses(res?.data || []);
        } catch (err) {
            setError(err.message || "Failed to fetch analyses list");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAnalyses();
    }, []);

    return { analyses, isLoading, error, refetch: fetchAnalyses };
}
