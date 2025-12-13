import { useState, useEffect } from "react";
import { getAnalysesList } from "../../api/apiClient";
import useAppContext from "../../context/useAppContext";

export function useAnalysesList() {
    const { setAnalyses } = useAppContext();
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

    return { isLoading, error, refetch: fetchAnalyses };
}
