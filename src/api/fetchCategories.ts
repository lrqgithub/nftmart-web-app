import axiosClient from '../apiClient/axiosClient';

type Categories = {
  list: Category[],
}

export default async () => {
  const res = await axiosClient.get<Categories>('/categories', {
  });
  return res.data;
};
