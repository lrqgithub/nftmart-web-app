import axiosClient from '../apiClient/axiosClient';

type NftsList = {
  list: NFT[],
} & Pagination

export default async (type?: string, category?: string, collection?: string[], status?: string[]) => {
  const res = await axiosClient.get<NftsList>('/nfts', {
    params: {
      type,
      category,
      collection,
      status,
    },
  });
  return res.data;
};
