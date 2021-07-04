import axiosClient from '../apiClient/axiosClient';

export default async (address: string) => {
  const res = await axiosClient.get<{ banner: string }>(`/accounts/${address}`);
  return res.data;
};
