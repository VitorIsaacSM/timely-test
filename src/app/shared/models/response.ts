import { Observable } from 'rxjs';

export interface ResponseObject<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export type Response<T> = Observable<ResponseObject<T>>;
