import axiosClient from '../apiClient/axiosClient';

type Categories = {
  data: {
    categories: Category[],
  }
}

export default async () => {
  const res = await axiosClient.get<Categories>('/categories', {
  });
  return res.data;
};
