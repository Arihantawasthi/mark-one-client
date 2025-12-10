import { useState } from "react";
import { postRequest } from "../api/apiClient";

const noop = () => {};
const defaultOptions = {
    onSuccess: noop,
    onError: noop,
}

function useProvideGoPost() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const goPost = async (url, body, sideEffects=defaultOptions) => {
        const { onSuccess, onError } = sideEffects;
        setLoading(true);
        try {
            setError(null);
            const response = await postRequest(url, body);

            if (!response.requestStatus) {
                throw new Error(response.message || 'Request failed');
            }
            setData(response);
            onSuccess(response);
        } catch (err) {
            onError && onError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        goPost,
        loading,
        error,
    };
}

export default useProvideGoPost;
