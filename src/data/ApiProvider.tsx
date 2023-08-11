import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import httpClient, {HTTPClient} from '../clients/httpClient';
import { useFlash } from './FlashProvider';

const ApiContext = createContext<HTTPClient | null>(null);
export default function ApiProvider({ children }: { children: ReactElement }) {
  const flash = useFlash();

  const onError = useCallback(() => {
    flash &&
      flash('An unexpected error has occured, Please try again.', 'danger');
  }, [flash]);

  const api = useMemo(() => new httpClient(onError), [onError]);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
  return useContext(ApiContext) as HTTPClient;
};
