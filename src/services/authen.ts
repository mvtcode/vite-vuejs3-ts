import { Post } from '.';
import { Endpoint } from '@/caching/endpoint';

const endpoint = Endpoint.getInstance();

export const Login = async (username: string, password: string) => {
  const res = await Post(endpoint.getUrl('cnps.sur.login-backend'), {
    username,
    password,
  });
  return res.data;
};
