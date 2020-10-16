import {useCallback, useEffect, useState} from "react";

type IFetchStatus = null | 'loading' | 'finished' | 'error';
type IUSeFetchReturn<T> = {
  data: T,
  state: IFetchStatus,
  status: number | null,
};
function useFetch<T = any>(url: string, retry = 0): IUSeFetchReturn<T> {
  const [data, setData] = useState<T>(null);
  const [state, setState] = useState<IFetchStatus>(null);
  const [status, setStatus] = useState<number | null>(null);

  const retrieve = useCallback(
    (url, retry) => {
      let cancelled = false;

      const doFetch = async () => {
        if (cancelled) return;
        const response = await fetch(url);

        if (cancelled) return;
        setStatus(response.status);
        if (response.status >= 500) {
          setData(null);
          setState('error');

          if (retry > 0) {
            setTimeout(doFetch, retry);
          }
        }

        const responseJson = await response.json();
        setData(responseJson);
        setState('finished');

        return responseJson;
      };

      doFetch().catch(() => {
        setState('error');
        setData(null);
      });

      return () => { cancelled = true; };
    },
    [setData, setState, setStatus],
  );

  useEffect(
    () => {
      if (!url) {
        setData(null);
        setState(null);
        return;
      }

      setState('loading');
      setData(null);

      return retrieve(url, retry);
    },
    [url, retry]
  );

  return {
    data,
    state,
    status,
  };
}

export default useFetch;
