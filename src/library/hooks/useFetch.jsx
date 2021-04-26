import { useState, useEffect, useCallback } from "react";

const apiStatus = {
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
};

const useFetch = (url) => {
    const [data, setData] = useState({});
    const [status, setStatus] = useState(apiStatus.LOADING);

    const fetchData = useCallback(async () => {
        setStatus(apiStatus.LOADING);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setStatus(apiStatus.SUCCESS);
        } catch (e) {
            console.error(e);
            setStatus(apiStatus.ERROR);
        }
    }, [url]);

    useEffect(() => {
        if (!url) return;
        fetchData();
    }, [url, fetchData]);

    return { status, data };
};

export default useFetch;