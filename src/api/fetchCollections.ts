import axiosClient from '../apiClient/axiosClient';

type Collections = {
  list: Collection[],
}

export default async () => {
  const res = await axiosClient.get<Collections>('/collections', {
  });
  return res.data;
};
