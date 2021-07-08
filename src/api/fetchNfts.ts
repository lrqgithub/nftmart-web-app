import axiosClient from '../apiClient/axiosClient';

type NftsList = {
  data: {
    orders: Order[],
  }
} & Pagination

export type FetchNftParams = {
  type?: string,
  categoryId?: string,
  collectionId?: string[],
  status?: string[],
  address?: string[]
}

export default async ({
  type, categoryId, collectionId, status,
}: FetchNftParams) => {
  const res = await axiosClient.get<NftsList>('/orders', {
    params: {
      type,
      categoryId,
      collectionId,
      status,
    },
  });
  return res.data;
};
