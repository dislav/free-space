export type PromiseStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ActionSaga<T extends {} = any> = {
  payload: T;
  type: string;
};

export type ReduxStatus = {
  status: PromiseStatus;
  error?: string | null;
};

export type Response<T extends {} = any> = {
  status: boolean;
  data: { session?: boolean } & T;
  message?: string;
};

export type Auth = {
  id: string;
  hash: string;
  hash2: string;
};

export type User = {
  id: string | null;
  mail: string | null;
  username: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
};

export type Wash = {
  id: string;
  name: string;
  description: string;
  city: string;
  street: string;
  geoid: string;
  worktime: string;
  phone: string;
};
