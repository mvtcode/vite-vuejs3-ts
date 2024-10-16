export interface Response<T> {
  code: number;
  message: string;
  result: boolean;
  success: boolean;
  data: T;
}
