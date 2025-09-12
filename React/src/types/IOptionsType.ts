export interface IOptionsType<T = Record<string, unknown>> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: string;
  data?: T;
  token?: string | null;
}
