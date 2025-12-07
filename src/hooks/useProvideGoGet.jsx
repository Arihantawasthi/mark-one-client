import { useState } from "react";
import { getRequest } from "../api/apiClient";


const noop = () => {};
const defaultOptions = {
    onSuccess: noop,
    onError: noop
}

function useProvideGoGet() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const goGet = async (url, sideEffects=defaultOptions) => {
        const { onSuccess, onError } = sideEffects;
        setLoading(true);
        try {
            setError("");
            const response = await getRequest(url);
            if(!response.requestStatus) {
                throw new Error(response.message);
            }
            setData(response.data);
            onSuccess(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            onError && onError(error);
        }
    }

    return { data, loading, error, goGet }
}


export default useProvideGoGet;

