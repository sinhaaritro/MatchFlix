import { useState, useEffect, useCallback } from "react";
import * as Constants from "library/constants/constants";

const useFetch = (url) => {
    const [data, setData] = useState({});
    const [status, setStatus] = useState(Constants.apiStatus.LOADING);

    const fetchData = useCallback(async () => {
        setStatus(Constants.apiStatus.LOADING);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Not 2xx response");
            }
            const data = await response.json();
            setData(data);
            setStatus(Constants.apiStatus.SUCCESS);
        } catch (e) {
            console.error(e);
            setStatus(Constants.apiStatus.ERROR);
        }
    }, [url]);

    useEffect(() => {
        if (!url) return;
        fetchData();
    }, [url, fetchData]);

    return { status, data };
};

export default useFetch;
