export interface IOptionsType<T = Record<string, unknown>> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: T;
  token?: string | null;
}
