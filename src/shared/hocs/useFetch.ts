import { AxiosResponse } from 'axios';
import { Nothing } from 'immer/dist/internal';
import { useState, useEffect } from 'react';

type FetchStatus = 'idle' | 'loading' | 'error' | 'success';

interface FetchResult<T> {
  data?: T;
  error?: Error;
  status: FetchStatus;
}

const useFetch = <P,R>(fetcher: (fetcherArgs: P) => Promise<AxiosResponse<R>>) => (args: P): FetchResult<R> => {
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [status, setStatus] = useState<FetchStatus>('idle');

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setStatus('loading');
        const response = await fetcher(args);
        if (isMounted) {
          setData(response.data);
          setStatus('success');
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error);
          setStatus('error');
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, error, status };
}

export default useFetch;