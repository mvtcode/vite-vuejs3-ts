import { Response } from '@/interfaces/response';
import { EndpointRes } from '@/interfaces/endpoint';
import { Post } from '.';

const endpoint = import.meta.env.VITE_GET_ENDPOINT_URL;
const token = import.meta.env.VITE_INSIDE_TOKEN;

export const GetEndpioint = (): Promise<Response<EndpointRes>> => {
  return Post(
    endpoint,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};
