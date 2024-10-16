import { Response } from '@/interfaces/response';
import { SystemConfigRes } from '@/interfaces/systemConfig';
import { Post } from '.';

const endpoint = import.meta.env.VITE_GET_SYSTEM_CONFIG_URL;
const token = import.meta.env.VITE_INSIDE_TOKEN;

export const GetSystemConfig = (): Promise<Response<SystemConfigRes>> => {
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
