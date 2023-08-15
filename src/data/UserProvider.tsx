import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MeType } from './user';
import { useApi } from './ApiProvider';

interface UserType {
  customer: MeType | null;
  logout: () => void;
  login: (email: string, password: string) => Promise<string>;
  setCustomer: Dispatch<SetStateAction<MeType | null>>;
}
const UserContext = createContext<UserType | null>(null);
export default function UserProvider({ children }: any) {
  const [customer, setCustomer] = useState<MeType | null>(null);
  const api = useApi();

  // | { _id?: string; email: string; username: string }
  // | undefined = user?.user;
  if (customer) {
    const encoder = new TextEncoder();
    const data = `${customer?.username}${customer?.email}`;
    const dataBuffer = encoder.encode(data);
    // const decodedUint8Array = decoder.decode(new Uint8Array([...decodedData].map(char => char.charCodeAt(0))));

    const base64Encoded = btoa(dataBuffer.toString());
    customer._id = base64Encoded;
  }
  useEffect(() => {
    void (async () => {
      if (api.isAuthenticated()) {
        const res = await api.get<MeType>('/users/me');

        if (res.ok) {
          setCustomer({ _id: customer?._id, ...res.body } as MeType);
          console.log('cystomer', customer);
        }
      }
    })();
  }, [api]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await api.login(email, password);

      if (res === 'ok') {
        const result = await api.get<MeType>('/users/me');
        if (result.ok) {
          setCustomer({ _id: customer?._id, ...result.body } as MeType);
        }
      }
      return res;
    },
    [api],
  );

  const logout = useCallback(async () => {
    await api.logout();
    setCustomer(null);
  }, [api]);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return (
    <UserContext.Provider value={{ customer, setCustomer, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useCustomer = () => {
  return useContext(UserContext) as UserType;
};
