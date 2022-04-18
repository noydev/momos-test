import { useCallback, useState } from "react";

interface UseFetch<T> {
  data?: T;
  error: string;
  loading: boolean;
  getData: () => Promise<void>;
}

const useFetch = <T>(url: string, fetchOption?: RequestInit): UseFetch<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState("");

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(url, fetchOption);
      const fetchData = await res.json();

      setData(fetchData);
      setError("");
    } catch (err) {
      let errorMessage = "Failed to connect";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchOption?.body, url]);

  return { getData, loading, data, error };
};

export default useFetch;
