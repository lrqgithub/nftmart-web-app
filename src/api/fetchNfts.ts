import axiosClient from '../apiClient/axiosClient';

type NftsList = {
  orders: NFT[],
} & Pagination

export default async (type?: string, category?: string, collection?: string[], status?: string[]) => {
  const res = await axiosClient.get<NftsList>('/orders', {
    params: {
      type,
      category,
      collection,
      status,
    },
  });
  return res.data;
};
