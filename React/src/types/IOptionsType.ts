export interface IOptionsType {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: string;
  data?: Record<string, unknown>;
  token?: string | null;
}
